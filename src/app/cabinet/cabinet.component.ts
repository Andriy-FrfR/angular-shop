import { Component, OnInit } from '@angular/core';
import { faHeart, faListAlt, faUserCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  faUserCircle = faUserCircle;
  faListAll = faListAlt;
  faHeart = faHeart;

  constructor() { }

  ngOnInit(): void {
  }

}
