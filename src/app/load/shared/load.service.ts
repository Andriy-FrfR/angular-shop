import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  downloadImg(product: Product): Observable<AngularFireStorageReference> {
    const imageRef = this.storage.ref(`/img/${product.img[0]}`);

    return imageRef.getDownloadURL();
  }
}
