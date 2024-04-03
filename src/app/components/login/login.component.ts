import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LogoComponent } from "../logo/logo.component";
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [RouterLink, CardModule, FloatLabelModule, ButtonModule, ReactiveFormsModule, InputTextModule, LogoComponent]
})
export class LoginComponent {
  value: any;
  loginForm = this.formBuilder.group({
    email: ['',  Validators.required],
    password: ['',  Validators.required]
  });
  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService) {
  }
  loginUser() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password)
      .subscribe(res => {
       console.log(res);
        if (res) {
          this.router.navigate(['/problems']);
        }
      });
    }
  }
}
