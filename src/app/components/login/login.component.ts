import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import { ParticlesConfig } from '../../../particles-config';
import {Md5} from 'ts-md5';
import {DialogConfirmationDialogComponent} from '../dialog-confirmation-dialog/dialog-confirmation-dialog.component';
import {MatDialog} from '@angular/material';
declare let particlesJS: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  selectedVal: string;
  responseMessage = '';
  responseMessageType = '';
  emailInput: string;
  passwordInput: string;
  userDetails: any;
  userLoggedIn: boolean;


  constructor(
    public authService: LoginService,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.selectedVal = 'login';
  }
  ngOnInit() {

    this.invokeParticles();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
  // Comman Method to Show Message and Hide after 2 seconds
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
    }, 2000);
  }

  // Check localStorage is having User Data
  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }

  // SignOut Firebase Session and Clean LocalStorage

  // Login user with  provided Email/ Password
  loginUser() {
    this.responseMessage = '';
    const pass = Md5.hashStr(this.passwordInput).toString();
    this.authService.login(this.emailInput, pass).then(result => {
      // this.openDialog();
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationDialogComponent, {
      width: '400px',
      data: {information: 'Utilisateur connecté'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/users']);
    });
  }
  googleLogin() {
    this.authService.loginWithGoogle()
      .then(res => {
        console.log(res);
        this.showMessage('success', 'Successfully Logged In with Google');
        this.isUserLoggedIn();
      }, err => {
        this.showMessage('danger', err.message);
      });
  }

  ngOnDestroy(): void {
    this.userDetails = null;
  }
  // // Register user with  provided Email/ Password
  // registerUser() {
  //   this.authService.register(this.emailInput, this.passwordInput)
  //     .then(res => {
  //
  //       // Send Varification link in email
  //       this.authService.sendEmailVerification().then(res => {
  //         console.log(res);
  //         this.isForgotPassword = false;
  //         this.showMessage('success', 'Registration Successful! Please Verify Your Email');
  //       }, err => {
  //         this.showMessage('danger', err.message);
  //       });
  //       this.isUserLoggedIn();
  //
  //
  //     }, err => {
  //       this.showMessage('danger', err.message);
  //     });
  // }
  //
  // // Send link on given email to reset password
  // forgotPassword() {
  //   this.authService.sendPasswordResetEmail(this.emailInput)
  //     .then(res => {
  //       console.log(res);
  //       this.isForgotPassword = false;
  //       this.showMessage('success', 'Please Check Your Email');
  //     }, err => {
  //       this.showMessage('danger', err.message);
  //     });
  // }

  // Open Popup to Login with Google Account

}

