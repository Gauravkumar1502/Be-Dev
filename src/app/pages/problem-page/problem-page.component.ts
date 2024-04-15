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
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';


@Component({
    selector: 'app-problem-page',
    standalone: true,
    templateUrl: './problem-page.component.html',
    styleUrl: './problem-page.component.css',
    imports: [FormsModule, RouterOutlet, SkeletonModule, CommonModule, ProgressSpinnerModule, DialogModule, RouterLink,SplitterModule, CardModule, MonacoEditorComponent, QuestionComponent, TabViewModule]
})
export class ProblemPageComponent {
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
    problemId: any;
    isTestcase$: any;
    testCases$: any;
    questionObservable: any;
    testCaseLength: number = 0;
    isAllTestCasesPassed: boolean = true;
    runtime: number = 0;
    memory: number = 0;
    errorString: string = '';
    visible: boolean = false;
    constructor(private questionService: QuestionService,
        private route: ActivatedRoute,
        private dataService: DataService,
        private websocketService: WebsocketService) { 
        this.problemId = this.route.snapshot.params['id'];
        this.testCases$ = this.dataService.testCases$;
        this.questionObservable = this.dataService.question$;
        this.isTestcase$ = this.dataService.isTestcase$;
    }
    ngOnInit() {
        let qID: number = 0;
        this.problemId = this.route.snapshot.params['id'];
        if(this.problemId == 'compete-online') {
            this.visible = true;
            this.websocketService.connect();
            this.websocketService.listen('room-message').subscribe((response) => {
                console.log(`Question id: ${response}`);
                qID = response as number;
                this.questionService.getQuestionsById(qID).subscribe((data) => {
                    this.dataService.updateQuestion(data);
                    this.visible = false;
                });
            });
            console.log(`Problem id: ${qID}`);
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
        this.dataService.isTestcase$.subscribe((isTestcase) => {
            this.isTestcase$ = isTestcase;
            console.log(`Is Testcase: ${this.isTestcase$}`);
        });
    }
    onDefaultInputs(arg0: any) {
        this.dataService.updateQuestion(this.question);
    }
    switchIsTestcase(bool: boolean) {
        this.dataService.updateIsTestcase(bool);
    }
    getIsTestcase() {
        return this.isTestcase$;
    }
}
