import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LogoComponent } from "../logo/logo.component";
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [RouterLink, CardModule, FloatLabelModule, ButtonModule, ReactiveFormsModule, InputTextModule, LogoComponent]
})
export class RegisterComponent {
  value: any;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
  }
  onSubmit() {
    alert('Method not implemented.');
  }

  getValuesInString() {
    return JSON.stringify(this.registerForm.value);
  }

}
