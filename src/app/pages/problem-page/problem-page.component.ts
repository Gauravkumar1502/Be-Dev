import { Component, SimpleChanges } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { MonacoEditorComponent } from "../../components/monaco-editor/monaco-editor.component";
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
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
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-problem-page',
    standalone: true,
    templateUrl: './problem-page.component.html',
    styleUrl: './problem-page.component.css',
    imports: [FormsModule, RouterOutlet, SkeletonModule, CommonModule, ButtonModule, ProgressSpinnerModule, DialogModule, RouterLink,SplitterModule, CardModule, MonacoEditorComponent, QuestionComponent, TabViewModule]
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
    pDialogHeader: string = 'Waiting for other user';
    pDialogMessage: string = 'Please wait for other user to join the room to start the competition';
    constructor(private questionService: QuestionService,
        private route: ActivatedRoute,
        private router: Router,
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
        if(this.problemId === 'compete-online') {
            this.visible = true;
            this.websocketService.connect();
            this.websocketService.listen('assign-question-id').subscribe((response) => {
                console.log(`Question id: ${response}`);
                qID = response as number;
                this.questionService.getQuestionsById(qID).subscribe((data) => {
                    this.dataService.updateQuestion(data);
                    this.visible = false;
                });
            });
            this.websocketService.listen('opponent-disconnected').subscribe((response) => {
                console.log(`Opponent disconnected`);
                this.pDialogHeader = 'Opponent disconnected';
                this.pDialogMessage = 'Your opponent has disconnected. You will be redirected to the problems page...';
                this.visible = true;
            });
            this.websocketService.listen('opponent-passed-some-test-cases').subscribe((response) => {
                this.pDialogHeader = 'Opponent passed some test cases';
                this.pDialogMessage = response as string;
                this.visible = true;
            });
            this.websocketService.listen('opponent-passed-all-test-cases').subscribe((response) => {
                this.pDialogHeader = 'You Lost';
                this.pDialogMessage = response as string;
                this.visible = true;
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
            if (this.problemId === 'compete-online') {
                if (this.isAllTestCasesPassed) {
                    this.websocketService.emit('all-test-cases-passed', 'All test cases passed');
                    this.pDialogHeader = 'You Won';
                    this.pDialogMessage = 'You have passed all test cases. You won the competition';
                    this.visible = true;
                }else {
                    this.websocketService.emit('some-test-cases-passed', `Your opponent has passed ${testCases.filter((testCase: any) => testCase.isPassed).length} test cases out of ${testCases.length}`);
                }
            }
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
    redirectToProblems() {
        // redirect to problems page and refresh the page
        this.router.navigate(['/problems']);
    }
}
