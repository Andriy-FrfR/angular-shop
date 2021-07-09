import { Category } from './../interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: Product[] | undefined,
            categories: Category[],
            searchCategoryStr: string,
            searchSubCategoryStr: string): Product[] | undefined {
    if (!products) {
      return;
    }

    if (!searchCategoryStr) {
      return products;
    }

    if (!searchSubCategoryStr) {
      const searchCategory: Category | undefined = categories.find((category: Category) => {
        return category.title === searchCategoryStr ? true : false;
      });

      if (!searchCategory) {
        return;
      }

      return products.filter((product: Product) => {
        for (const subCategory of searchCategory.subCategories) {
          if (!subCategory) {
            continue;
          }

          if (product.subCategory === subCategory.title) {
            return true;
          }
        }

        return false;
      });
    }

    return products.filter((product: Product) => {
      if (product.subCategory === searchSubCategoryStr) {
        return true;
      }

      return false;
    });
  }
}
