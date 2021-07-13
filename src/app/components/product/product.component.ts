import { LoadService } from './../../load/shared/load.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product!: Product;
  imgUrls: any[] = [];
  activeImgUrl: any;

  constructor(private productsServ: ProductsService, private route: ActivatedRoute, private loadServ: LoadService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productsServ.getProductById(params.id).subscribe((product: Product) => {
        this.product = product;

        this.loadImages();
      });
    });
  }

  loadImages(): void {
    const imgUrlsObsArr: Observable<any>[] = this.loadServ.downloadImg(this.product);

    for (const imgUrlObs of imgUrlsObsArr) {
      imgUrlObs.subscribe((downloadUrl: any) => {
        this.imgUrls.push(downloadUrl);

        if (!this.imgUrls[1]) {
          this.activeImgUrl = downloadUrl;
        }
      });
    }
  }

  setActiveImg(imgUrl: any): void {
    this.activeImgUrl = imgUrl;
  }
}
