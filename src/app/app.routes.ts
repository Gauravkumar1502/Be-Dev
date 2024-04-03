import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProblemsPageComponent } from './pages/problems-page/problems-page.component';
import { ProblemPageComponent } from './pages/problem-page/problem-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'problems', component: ProblemsPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'problem/:id', component: ProblemPageComponent}
]