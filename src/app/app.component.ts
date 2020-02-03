import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {Subscription} from 'rxjs';
import {UsersService} from './services/users.service';
import {Router} from '@angular/router';
import { ParticlesConfig } from '../particles-config';
declare let particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProjetMaster';
  userLoggedIn: boolean;
  userLoggedInSubscrition: Subscription;
  // particlesJS: any;

  constructor(private authService: LoginService, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userLoggedInSubscrition = this.authService.userLoggedInSubject.subscribe(userLoggedIn => {

      if (localStorage.getItem('userLoggedIn')) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }

      console.log(this.userLoggedIn);
    });

    this.invokeParticles();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
  ngOnDestroy(): void {
    this.userLoggedInSubscrition.unsubscribe();
  }

}
