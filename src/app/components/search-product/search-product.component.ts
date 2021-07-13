import { LoadService } from '../../load/shared/load.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  @Input() product!: Product;
  imgUrls: any[] = [];

  constructor(private loadServ: LoadService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    const imgUrlsObsArr: Observable<any>[] = this.loadServ.downloadImg(this.product);

    for (const imgUrlObs of imgUrlsObsArr) {
      imgUrlObs.subscribe((downloadUrl: any) => {
        this.imgUrls.push(downloadUrl);
      });
    }
  }

}
