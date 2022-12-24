import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { IAuthentication } from 'src/providers/Authentication/contracts/authentication.interface';
import { INavigator } from 'src/providers/Navigation/contracts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HiveWay';

  timeOutInactivityUser: number = 280000;//seconds
  constructor(private bnIdle: BnNgIdleService,
    private authenticationService: IAuthentication,
    private navigateService: INavigator
    ) {}
  
  ngOnInit(): void {
    this.bnIdle.startWatching(this.timeOutInactivityUser).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        const currentUser: any = this.authenticationService.currentUserValue;
        if (currentUser) {
          this.authenticationService.logout();
          this.navigateService.Push(["auth/login"],"auth/login");
        }
      }
    });
  }
}
