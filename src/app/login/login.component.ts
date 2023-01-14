import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsAndNotificationsService } from '../services/alerts-and-notifications.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {}
  loginWithEmail() {
    try {
      if (this.loginForm.valid) {
        this.auth.loginEmailPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.alertify.presentToast('Login Successful');
      } else {
        alert('Invalid Login Credentials');
      }
    } catch (error: any) {
      this.alertify.presentToast(error.message);
    }
    this.loginForm.reset();
  }
}
