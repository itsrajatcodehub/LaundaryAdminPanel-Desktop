import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsAndNotificationsService } from '../services/alerts-and-notifications.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  redirect: boolean = false;
  constructor(
    public authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService,
    private activatedRoute: ActivatedRoute,
  
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.redirect == 'true') {
        this.authService = params.redirect;
        this.redirect = params.redirect;
      }
    });
  }
  signUpWithEmailAndPassword() {
    try {
      this.authService.signUpWithEmailAndPassword(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.username
      );
    
      this.signUpForm.reset();
    } catch (error: any) {
      this.alertify.presentToast(error.message);
    }
  }

  ngOnInit(): void {}
}
