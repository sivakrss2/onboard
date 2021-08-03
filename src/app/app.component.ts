import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import {
Event,
NavigationCancel,
NavigationEnd,
NavigationError,
NavigationStart,
Router
} from '@angular/router';
import { LoaderService } from './services/loader.services';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;
  loading = true;

  constructor(private router: Router, private loaderService: LoaderService,private layoutService: LayoutService,
     private bnIdle : BnNgIdleService) {

    this.router.events.subscribe((event: Event) => {
    switch (true) {
    case event instanceof NavigationStart: {
    this.loading = true;
    this.loaderService.isLoading.next(this.loading);
    break;
    }
    case event instanceof NavigationEnd:
    case event instanceof NavigationCancel:
    case event instanceof NavigationError: {
    this.loading = false;
    this.loaderService.isLoading.next(this.loading);
    break;
    }
    default: {
    break;
    }
    }
    });
    }

  ngOnInit() {

    /** Session destroy */
    this.bnIdle.startWatching(600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        localStorage.removeItem("login");
        localStorage.removeItem("permissions");
        this.router.navigate(["login"]);
      }
    });


    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
  }
}
