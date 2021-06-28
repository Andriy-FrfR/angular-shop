import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }

  sidenavToggle(): void {
    this.sidenav.toggle();
  }
}
