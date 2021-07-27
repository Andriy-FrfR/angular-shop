import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {
  backdrop$ = new Subject<string>();
  private renderer!: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showBackdrop(): void {
    this.backdrop$.next('show');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  hideBackdrop(): void {
    this.backdrop$.next('hide');
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }
}
