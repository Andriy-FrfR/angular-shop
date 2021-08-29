import { Order } from './../../../shared/interfaces/order.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent implements OnInit {
  @Input() order!: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
