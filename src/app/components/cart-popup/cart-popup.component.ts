import { UserData } from './../../shared/interfaces/user-data.interface';
import { BackdropService } from './../../shared/services/backdrop.service';
import { LoadService } from './../../load/shared/load.service';
import { ProductsService } from './../../shared/services/products.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss']
})
export class CartPopupComponent implements OnInit {
  token!: string;

  constructor(
    private authServ: AuthService,
    private productsServ: ProductsService,
    private loadServ: LoadService,
    private backdropServ: BackdropService
  ) { }

  ngOnInit(): void {
    this.authServ.token.subscribe((token: string | null) => {
      if (!token) {
        console.log(token);
        this.backdropServ.hideBackdrop();
        setTimeout(() => {
          this.authServ.showAuthPopup();
        }, 1000)
        // this.authServ.showAuthPopup();

        return;
      }

      this.authServ.getUserData().subscribe((userData: UserData) => {
        console.log(userData);
      });
    });
  }

}
