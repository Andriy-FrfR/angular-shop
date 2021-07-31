import { BackdropService } from './../services/backdrop.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appHideBackdrop]'
})
export class HideBackdropDirective {

  constructor(private backdropServ: BackdropService) { }

  @HostListener('click')
  onClick(): void {
    this.backdropServ.hideBackdrop();
  }
}
