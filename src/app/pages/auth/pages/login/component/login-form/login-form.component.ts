import { Component, OnInit, inject, signal } from '@angular/core';
import { CustomBtnDirective } from '../../../../../../shared/directives/custom-btn.directive';
import { AuthService } from '../../../../services/auth.service';
import { UserLogin } from '../../../../../../models/user-login';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ApiLoadService } from '../../../../../../shared/services/api-load.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CustomBtnDirective, ReactiveFormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private route = inject(Router);
  private apiLoad = inject(ApiLoadService);

  formLogin: FormGroup = new FormGroup({});
  isSubmit = signal<boolean>(false);

  showPassword = signal<boolean>(false);

  showUnauthorized = signal<boolean>(false);

  constructor() {

  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      // TODO: expresion regular necesaria para el login?
      password: ["", Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  get email() {
    return this.formLogin.controls["email"];
  }

  get password() {
    return this.formLogin.controls["password"];
  }

  toggleVisiblePassword() {
    this.showPassword.update(v => !v);
  }


  public submitLogin() {
    this.showUnauthorized.set(false);
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid || this.isSubmit()) {
      return;
    }
    console.log("inicio de peticion de login")
    this.isSubmit.set(true);
    let model: UserLogin = {
      email: this.email.value,
      password: this.password.value
    }

    this.formLogin.disable();
    this.apiLoad.start()
    this.authService.login(model)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.route.navigateByUrl("/dashboard")
        },
        error: () => {
          this.formLogin.enable();
          this.isSubmit.set(false);
          this.showUnauthorized.set(true);
          this.apiLoad.end();
        },
        complete: () => {
          this.formLogin.enable();
          this.isSubmit.set(false);
          this.apiLoad.end()
        }
      }
      );
  }
}
