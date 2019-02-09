import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { FormValidatorErrors } from 'src/app/utils/validators/errors.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public currentYear = new Date();

  public registerForm: FormGroup;
  public registering: boolean;
  public buttonRegister: string;


  constructor(private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private formValidatorErrors: FormValidatorErrors) {

    this.route.config[0].children[0].redirectTo = 'register';

    if (this.authService.isLoggedIn()) {
      this.route.navigate(['home']);
      return;
    }

  }

  ngOnInit() {

    this.registering = false;
    this.buttonRegister = 'Cadastrar';


    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });

  }

  public register(): void {

    this.formValidatorErrors.getFormValidationErrors(this.registerForm);

    if (this.registerForm.valid) {


      const formControls = this.registerForm.controls;

      const registerData = {
        name: formControls.name.value,
        email: formControls.email.value,
        password: formControls.password.value,
        confirm_password: formControls.confirm_password.value
      }

      this.registering = true;
      this.buttonRegister = 'Cadastrando';

      this.authService.registerUser(registerData)
        .subscribe(
          () => {

            this.registering = false;
            this.goToLogin();
          },
          () => {
            this.registering = false;
            this.buttonRegister = 'Cadastrar';
          });
    }
  }

  public goToLogin(): void {
    this.route.navigate(['./login'])
  }

}
