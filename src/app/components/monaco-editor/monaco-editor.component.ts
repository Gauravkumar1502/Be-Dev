import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { ThemeService } from '../../services/theme.service';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';

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
  selectedLanguage: string = 'c';
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
    createdAt : '',
    updatedAt : '',
    extraInfo : '',
    hints : [],
    examples : []
};
  @Input() cppBoilerplateCode = '';
  @Input() javaBoilerplateCode = '';
  @Input() pythonBoilerplateCode = '';
  Ln: number = 1;
  Col: number = 1;

  constructor(private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    private questionService: QuestionService) {
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
    this.questionService.runCode(this.selectedLanguage, this.code, this.question.defaultInputs)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}