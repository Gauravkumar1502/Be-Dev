import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testcase',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './testcase.component.html',
  styleUrl: './testcase.component.css'
})
export class TestcaseComponent {
  defaultInputs: any;
}
