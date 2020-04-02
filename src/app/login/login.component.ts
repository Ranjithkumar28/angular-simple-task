import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * This method is used to login to the application
   * @memberof LoginComponent
   */
  public login(): void {
    if (this.loginForm.valid) {
      console.log(this.authService.checkLogin(this.loginForm.value.username, this.loginForm.value.password))
       if (this.authService.checkLogin(this.loginForm.value.username, this.loginForm.value.password)) {
        this.toastr.success("Logged in successfully");
        this.router.navigate(['/home']);
       } else {
        this.toastr.error("Invalid Login Credential");
       }
    }
  }

}
