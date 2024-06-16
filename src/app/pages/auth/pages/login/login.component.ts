import { Component, inject } from '@angular/core';
import { BannerComponent } from './component/banner/banner.component';
import { LoginFormComponent } from './component/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BannerComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
