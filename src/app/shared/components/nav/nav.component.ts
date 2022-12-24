import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IAuth } from 'src/app/auth/services/contracts/auth.interface';
import { AuthenticationService } from 'src/providers';
import { IAuthentication } from 'src/providers/Authentication/contracts/authentication.interface';
import { INavigator } from 'src/providers/Navigation/contracts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() sidenav: any;

  menuLinks = [
  ];
  activeLink = {};
  background: ThemePalette = undefined;

  currentUser$ = this.authenticationService.currentUser;
  constructor(
    private navigateService: INavigator,
    private authService: IAuth,
    private authenticationService: IAuthentication
  ) { 
  }

  ngOnInit(): void {
    // this.navigateService.navigate(this.menuLinks[0].route ?? '');
  }

  navigate(menu: any) {
    this.navigateService.Push([menu?.route ?? ''], menu?.route ?? '');
    this.activeLink = menu;
  }
  logout() {
    this.authService.logout();
    this.navigateService.Push(["auth/login"],"auth/login")
  }
}
