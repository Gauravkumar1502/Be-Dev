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

@Component({
    selector: 'app-problem-page',
    standalone: true,
    templateUrl: './problem-page.component.html',
    styleUrl: './problem-page.component.css',
    imports: [FormsModule, RouterOutlet, CommonModule, RouterLink,SplitterModule, CardModule, MonacoEditorComponent, QuestionComponent]
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
        createdAt : '',
        updatedAt : '',
        extraInfo : '',
        hints : [],
        examples : []
    };
    lines: string = "a";
    constructor(private questionService: QuestionService, private route: ActivatedRoute) { 
        this.problemId = this.route.snapshot.params['id'];
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
    }
}
