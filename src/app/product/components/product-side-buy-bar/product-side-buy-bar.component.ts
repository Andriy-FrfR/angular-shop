import { faCheckCircle, faMinusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DownloadUrl } from './../../../load/shared/interfaces/download-url.interface';
import { LoadService } from './../../../load/shared/load.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DownloadUrlAsync } from 'src/app/load/shared/interfaces/download-url-async.interface';

@Component({
  selector: 'app-product-side-buy-bar',
  templateUrl: './product-side-buy-bar.component.html',
  styleUrls: ['./product-side-buy-bar.component.scss']
})
export class ProductSideBuyBarComponent implements OnInit {
  @Input() product!: Product;
  imgUrl!: DownloadUrl;
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  faShoppingCart = faShoppingCart;

  constructor(private loadServ: LoadService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    const imgUrlsAsyncArr: DownloadUrlAsync[] = this.loadServ.downloadImg(this.product);

    for (const imgUrlAsync of imgUrlsAsyncArr) {
      imgUrlAsync.urlObs.subscribe((downloadUrl: string) => {
        if (imgUrlAsync.index === 0) {
          this.imgUrl = {url: downloadUrl, index: imgUrlAsync.index};
          console.log(this.imgUrl);
        }
      });
    }
  }

}
