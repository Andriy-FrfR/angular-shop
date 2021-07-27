import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'filterByString'
})
export class FilterByStringPipe implements PipeTransform {

  transform(products: Product[], substr: string = '', searchByCategories: boolean, limit?: number): Product[] | undefined {
    if (searchByCategories) {
      return products;
    }

    if (!products || !substr) {
      return;
    }

    const filteredArr = products.filter((product) => {
      return product.title.toLowerCase().includes(substr.toLowerCase());
    });

    return filteredArr.splice(0, limit || filteredArr.length);
  }

}
