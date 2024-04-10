import { Component, SimpleChanges } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { MonacoEditorComponent } from "../../components/monaco-editor/monaco-editor.component";
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Question } from '../../models/question';
import { QuestionComponent } from "../../components/question/question.component";
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { TabViewModule } from 'primeng/tabview';

@Component({
    selector: 'app-problem-page',
    standalone: true,
    templateUrl: './problem-page.component.html',
    styleUrl: './problem-page.component.css',
    imports: [FormsModule, RouterOutlet, CommonModule, RouterLink,SplitterModule, CardModule, MonacoEditorComponent, QuestionComponent, TabViewModule]
})
export class ProblemPageComponent {
    onCodeChange() {
        console.log("onCodeChange called");
    }
    problemId: number;
    isTestcase: boolean = true;
    // empty initialization question
    question: Question = {
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
    testCases$: any;
    testCaseLength: number = 0;
    isAllTestCasesPassed: boolean = true;
    runtime: number = 0;
    memory: number = 0;
    errorString: string = '';
    constructor(private questionService: QuestionService, private route: ActivatedRoute, private dataService: DataService) { 
        this.problemId = this.route.snapshot.params['id'];
        this.testCases$ = this.dataService.testCases$;
    }
    ngOnInit() {
        this.problemId = this.route.snapshot.params['id'];
        console.log(this.problemId);
        this.questionService.getAllQuestionsById(this.problemId)
        .subscribe({
            next: (data) => {
                this.question = data;
            },
            error: (error) => {
                console.log(error);
            }
        });
        this.dataService.testCases$.subscribe((testCases) => {
            this.isAllTestCasesPassed = testCases.every((testCase: any) => testCase.isPassed);
            this.testCaseLength = testCases.length;
        });
        this.dataService.cpuTime$.subscribe((cpuTime) => {
            this.runtime = cpuTime;
        });
        this.dataService.memoryUsed$.subscribe((memoryUsed) => {
            this.memory = memoryUsed;
        });
        this.dataService.error$.subscribe((error) => {
            this.errorString = error;
        });
    }
}
