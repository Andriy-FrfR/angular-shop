import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {
  backdrop$ = new Subject<string>();

  constructor() { }

  showBackdrop(): void {
    this.backdrop$.next('show');
  }

  hideBackdrop(): void {
    this.backdrop$.next('hide');
  }
}
