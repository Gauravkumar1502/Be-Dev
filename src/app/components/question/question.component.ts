import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../models/question';
import { ToTitleCasePipe } from "../../pipes/to-title-case.pipe";
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
@Component({
    selector: 'app-question',
    standalone: true,
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
    imports: [ToTitleCasePipe, ChipModule, AccordionModule]
})
export class QuestionComponent {
  @Input() question: Question = {
    id: 0,
    title: '',
    difficulty: '',
    tags: '',
    companies: '',
    description: '',
    constraints: '',
    javaBoilerplateCode: '',
    c11BoilerplateCode: '',
    cppBoilerplateCode: '',
    pythonBoilerplateCode: '',
    defaultInputs: '',
    javaCode: '',
    createdAt: '',
    updatedAt: '',
    extraInfo: '',
    hints: [],
    examples: []
  }
  constructor() { }
  
  mdParser(mdString: string): string {
    // Handle bold and italic
    mdString = mdString.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    mdString = mdString.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle code block
    mdString = mdString.replace(/`([^`]+)`/g, '<code>$1</code>');
    return mdString;
  }
}
