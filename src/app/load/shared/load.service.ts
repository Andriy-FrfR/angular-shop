import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private storage: AngularFireStorage) { }

  downloadImg(product: Product): Observable<any>[] {
    const downloadUrls: Observable<any>[] = [];

    for (const image of product.img) {
      const imageRef = this.storage.ref(`/${product.id}/${image}`);

      downloadUrls.push(imageRef.getDownloadURL());
    }

    return downloadUrls;
  }
}
