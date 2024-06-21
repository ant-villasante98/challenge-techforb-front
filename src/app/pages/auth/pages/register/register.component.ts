import { NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomBtnDirective } from '../../../../shared/directives/custom-btn.directive';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiLoadService } from '../../../../shared/services/api-load.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CustomBtnDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private apiLoad = inject(ApiLoadService);

  registerForm: FormGroup = new FormGroup({});

  showPassword = signal<boolean>(false);

  isSubmit = signal<boolean>(false);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])]
    })

  }

  get firstName() {
    return this.registerForm.controls["firstName"]
  }
  get lastName() {
    return this.registerForm.controls["lastName"]
  }
  get email() {
    return this.registerForm.controls["email"]
  }
  get password() {
    return this.registerForm.controls["password"]
  }

  submitRegister() {
    console.log(this.password.errors)
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid || this.isSubmit()) {
      return
    }

    this.isSubmit.set(true);

    this.apiLoad.start()
    this.authService.register({
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value
    }).subscribe({
      next: () => {
        console.log("registro exitoso");
        this.router.navigateByUrl("/auth/login");
      },
      error: () => {
        this.isSubmit.set(false);
        this.apiLoad.end();
      },
      complete: () => {
        this.isSubmit.set(false);
        this.apiLoad.end();
      }
    });

  }

  toggleVisiblePassword() {
    this.showPassword.update(v => !v);
  }

  cancel() {
    this.router.navigateByUrl("/auth/login")
  }
}
