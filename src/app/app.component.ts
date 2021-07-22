import { Subscription } from 'rxjs';
import { BackdropService } from './shared/services/backdrop.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-shop';
  showBackdrop = false;
  subscriptions: Subscription[] = [];

  constructor(private backdropServ: BackdropService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.backdropServ.backdrop$.subscribe((message: string) => {
        if (message === 'show') {
          this.showBackdrop = true;
        }

        if (message === 'hide') {
          this.showBackdrop = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  hideBackdrop(): void {
    this.backdropServ.hideBackdrop();
  }
}
