import { DownloadUrl } from 'src/app/load/shared/interfaces/download-url.interface';
import { DownloadUrlAsync } from '../load/shared/interfaces/download-url-async.interface';
import { LoadService } from '../load/shared/load.service';
import { ProductsService } from '../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { faCheckCircle, faMinusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product!: Product;
  imgUrls: DownloadUrl[] = [];
  activeImgUrl = '';
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  faShoppingCart = faShoppingCart;

  constructor(private productsServ: ProductsService,
              private route: ActivatedRoute,
              private loadServ: LoadService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productsServ.getProductById(params.id).subscribe((product: Product) => {
        this.product = product;

        this.loadImages();
      });
    });
  }

  loadImages(): void {
    const imgUrlsArr: DownloadUrlAsync[] = this.loadServ.downloadImg(this.product);

    for (const imgUrl of imgUrlsArr) {
      imgUrl.urlObs.subscribe((downloadUrl: any) => {
        this.imgUrls.push({url: downloadUrl, index: imgUrl.index});

        this.sortImgByIndex();

        if (imgUrl.index === 0) {
          this.activeImgUrl = downloadUrl;
        }
      });
    }
  }

  setActiveImg(imgUrl: any): void {
    this.activeImgUrl = imgUrl;
  }

  sortImgByIndex(): void {
    this.imgUrls.sort((a, b) => {
      return a.index - b.index;
    });
  }
}
