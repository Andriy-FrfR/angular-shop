import { LoadService } from '../../load/shared/load.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  @Input() product!: Product;
  imgUrl!: AngularFireStorageReference;

  constructor(private loadServ: LoadService) { }

  ngOnInit(): void {
    this.loadServ.downloadImg(this.product).subscribe((imgUrl: AngularFireStorageReference) => {
      this.imgUrl = imgUrl;
    });
  }

}
