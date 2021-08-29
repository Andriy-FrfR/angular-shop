import { Subscription } from 'rxjs';
import { UserDataService } from './../../../shared/services/user-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  userData!: UserData;
  subscriptions: Subscription[] = [];

  constructor(private userDataServ: UserDataService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userDataServ.getUserData()
        .subscribe((userData: UserData) => {
          this.userData = userData;
          console.log(userData);
        })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
