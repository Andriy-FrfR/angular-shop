import { BackdropService } from './shared/services/backdrop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-shop';
  showBackdrop = false;

  constructor(private backdropServ: BackdropService) {}

  ngOnInit(): void {
    this.backdropServ.backdrop$.subscribe((message: string) => {
      if (message === 'show') {
        this.showBackdrop = true;
      }

      if (message === 'hide') {
        this.showBackdrop = false;
      }
    });
  }

  hideBackdrop(): void {
    this.backdropServ.hideBackdrop();
  }
}
