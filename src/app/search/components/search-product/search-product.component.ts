import { Subscription } from 'rxjs';
import { DownloadUrlAsync } from '../../../load/shared/interfaces/download-url-async.interface';
import { LoadService } from '../../../load/shared/load.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DownloadUrl } from 'src/app/load/shared/interfaces/download-url.interface';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  imgUrl!: DownloadUrl;
  subscriptions: Subscription[] = [];

  constructor(private loadServ: LoadService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  loadImages(): void {
    const imgUrlsAsyncArr: DownloadUrlAsync[] = this.loadServ.downloadImg(this.product);

    for (const imgUrlAsync of imgUrlsAsyncArr) {
      this.subscriptions.push(
        imgUrlAsync.urlObs.subscribe((downloadUrl: string) => {
          if (imgUrlAsync.index === 0) {
            this.imgUrl = {url: downloadUrl, index: imgUrlAsync.index};
          }
        })
      );
    }
  }
}
