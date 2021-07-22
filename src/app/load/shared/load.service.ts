import { Product } from '../../shared/interfaces/product.interface';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DownloadUrlAsync } from './interfaces/download-url-async.interface';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private storage: AngularFireStorage) { }

  downloadImg(product: Product): DownloadUrlAsync[] {
    const downloadUrls: DownloadUrlAsync[] = [];

    for (const imageObj of product?.img) {
      const imageRef = this.storage.ref(`/${product.id}/${imageObj.imgName}`);

      downloadUrls.push({urlObs: imageRef.getDownloadURL().pipe(first()), index: imageObj.index});
    }

    return downloadUrls;
  }
}
