import { map } from 'rxjs/operators';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../interfaces/sub-category.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  createCategory(title: string): Observable<Category> {
    return this.http.post<Category>(`${environment.dbUrl}/categories.json`, {
      title,
      subCategories: ['']
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(`${environment.dbUrl}/categories.json`)
      .pipe(
        map((categories: {[key: string]: Category}) => {
          const mappedCategories: Category[] = [];

          for (const [id, category] of Object.entries(categories)) {
            mappedCategories.push({id, ...category});
          }

          return mappedCategories;
        })
      );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.dbUrl}/categories/${id}.json`)
      .pipe(map((category: Category) => {
        return {id, ...category};
      }));
  }

  createSubCategory(category: Category, title: string): Observable<SubCategory> {
    category.subCategories.push({title});

    return this.http.patch<SubCategory>(`${environment.dbUrl}/categories/${category.id}.json`, {
      subCategories: category.subCategories
    });
  }
}
