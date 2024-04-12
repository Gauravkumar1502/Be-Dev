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
import { WebsocketService } from '../../services/websocket.service';

@Component({
    selector: 'app-problem-page',
    standalone: true,
    templateUrl: './problem-page.component.html',
    styleUrl: './problem-page.component.css',
    imports: [FormsModule, RouterOutlet, CommonModule, RouterLink,SplitterModule, CardModule, MonacoEditorComponent, QuestionComponent, TabViewModule]
})
export class ProblemPageComponent {
    problemId: any;
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
    questionObservable: any;
    testCaseLength: number = 0;
    isAllTestCasesPassed: boolean = true;
    runtime: number = 0;
    memory: number = 0;
    errorString: string = '';
    constructor(private questionService: QuestionService, private route: ActivatedRoute, private dataService: DataService, private websocketService: WebsocketService) { 
        this.problemId = this.route.snapshot.params['id'];
        this.testCases$ = this.dataService.testCases$;
        this.questionObservable = this.dataService.question$;
    }
    ngOnInit() {
        this.problemId = this.route.snapshot.params['id'];
        if(this.problemId == 'compete-online') {
            this.questionService.getRandomQuestion().subscribe({
                next: (data) => {
                    // this.question = data;
                    this.dataService.updateQuestion(data);
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }else {
            this.questionService.getQuestionsById(this.problemId)
            .subscribe({
                next: (data) => {
                    // this.question = data;
                    this.dataService.updateQuestion(data);
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
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
        this.dataService.question$.subscribe((question) => {
            this.question = question;
        });
    }
    onDefaultInputs(arg0: any) {
        this.dataService.updateQuestion(this.question);
    }
}
