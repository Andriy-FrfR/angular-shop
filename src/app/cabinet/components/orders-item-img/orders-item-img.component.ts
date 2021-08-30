import { DownloadUrl } from 'src/app/load/shared/interfaces/download-url.interface';
import { DownloadUrlAsync } from './../../../load/shared/interfaces/download-url-async.interface';
import { LoadService } from './../../../load/shared/load.service';
import { Product } from './../../../shared/interfaces/product.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders-item-img',
  templateUrl: './orders-item-img.component.html',
  styleUrls: ['./orders-item-img.component.scss']
})
export class OrdersItemImgComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  subscriptions: Subscription[] = [];
  imgUrl!: DownloadUrl;

  constructor(private loadServ: LoadService) { }

  ngOnInit(): void {
    this.loadImg();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private loadImg(): void {
    const downloadUrlAsyncArr: DownloadUrlAsync[] = this.loadServ.downloadImg(this.product);

    for (const downloadUrlAsync of downloadUrlAsyncArr) {
      if (downloadUrlAsync.index === 0) {
        this.subscriptions.push(
          downloadUrlAsync.urlObs
            .subscribe((url: string) => {
              this.imgUrl = { url, index: downloadUrlAsync.index };
            })
        );
      }
    }
  }
}
