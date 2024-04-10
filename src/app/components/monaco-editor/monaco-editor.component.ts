import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { ThemeService } from '../../services/theme.service';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { JdoodleService } from '../../services/jdoodle.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { TestCase } from '../../models/TestCase';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [FormsModule, MonacoEditorModule, DropdownModule],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.css',
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: {
        baseUrl: '/assets',
        defaultOptions: {
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          contextmenu: false,
        },
      },     
    },
  ],
})
export class MonacoEditorComponent {
  languages: string[] = ['c', 'cpp', 'java', 'python'];
  selectedLanguage: string = 'java';
  theme: string = 'vs-dark';
  editor: any;
  code: string = '';
  @ViewChild('editorBody', { static: false }) editorBody: any;
  @Input() question: Question = {
    id : 0,
    title : '',
    difficulty : '',
    tags : '',
    companies : '',
    description : '',
    constraints : '',
    javaBoilerplateCode : '',
    c11BoilerplateCode : '',
    cppBoilerplateCode : '',
    pythonBoilerplateCode : '',
    defaultInputs : '',
    javaCode : '',
    createdAt : '',
    updatedAt : '',
    extraInfo : '',
    hints : [],
    examples : []
  };
  Ln: number = 1;
  Col: number = 1;
  isLoading: boolean = false;
  result = {
    output: '',
    statusCode: '',
    memory: '',
    cpuTime: '',
    compilationStatus: '',
    projectKey: '',
  };
  TestCases: TestCase[] = [];

  constructor(private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    private questionService: QuestionService,
    private dataService: DataService) {
    this.theme = this.themeService.getThemeFromLocalStorage() === 'dark' ? 'vs-dark' : 'light';
  }
  ngOnChanges() {
    this.code = this.getBoilerplateCode(this.selectedLanguage);
  }
  changeLanguage($event: Event) {
    this.selectedLanguage = ($event.target as HTMLSelectElement).value;
    this.code = this.getBoilerplateCode(this.selectedLanguage);
  }

  onInit(editor: any) {
    
    // console.log("onInit() called",editor);
    this.editor = editor;
    let resizeObserver = new ResizeObserver(() => {
      this.editor.layout({
        width: this.editorBody.nativeElement.offsetWidth,
        height: this.editorBody.nativeElement.offsetHeight,
      });
    });
    resizeObserver.observe(this.editorBody.nativeElement);
    // print current cursor position
    this.editor.onDidChangeCursorPosition((e: any) => {
      this.Ln = e.position.lineNumber;
      this.Col = e.position.column;
      this.cdr.detectChanges();
    });
  }

  getBoilerplateCode(language: string): string {
    switch (language) {
      case 'c':
        return this.question.c11BoilerplateCode;
      case 'cpp':
        return this.question.cppBoilerplateCode;
      case 'java':
        return this.question.javaBoilerplateCode;
      case 'python':
        return this.question.pythonBoilerplateCode;
      default:
        return '';
    }
  }
  runCode() {
    this.isLoading = true;
    this.questionService.runCode(this.selectedLanguage, (this.question.javaCode + "\n" + this.code), this.question.defaultInputs)
      .pipe(
        tap(data => console.log(data)),
        catchError(error => {
          console.error(error);
          return throwError(() => error); // Re-throw for error handling
        }),
        finalize(() => this.isLoading = false)
      ).subscribe(
        (data) => {
          this.result = data;
          if(this.result.output.includes("error:") || this.result.cpuTime === null || this.result.memory === null) {
            this.dataService.updateError(this.result.output);
            this.dataService.updateTestCases([]);
            this.cdr.detectChanges();
          }else {
            this.modifyTestCases(this.result);
            this.dataService.updateTestCases(this.TestCases);
            this.dataService.updateMemoryUsed(+this.result.memory);
            this.dataService.updateCpuTime(+this.result.cpuTime);
            this.dataService.updateError('');
            this.cdr.detectChanges();
          }
        }
      );

  }
  modifyTestCases(result: { output: string; statusCode: string; memory: string; cpuTime: string; compilationStatus: string; projectKey: string; }) {
    this.TestCases = [];
    console.log("result.output", result.output);
    result.output.split('\n').forEach((element: string, index: number) => {
      let splitString = element.split('::');
      let testCase: TestCase = {
        input: splitString[0],
        output: splitString[1],
        expected: splitString[2],
        isPassed: splitString[1] === splitString[2] ? true : false
      };
      this.TestCases.push(testCase);
    });
  }
}