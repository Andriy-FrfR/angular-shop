import { Product } from 'src/app/shared/interfaces/product.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss']
})
export class CharacteristicsComponent implements OnInit {
  @Input() product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
