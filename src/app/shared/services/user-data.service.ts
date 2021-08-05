import { UserData } from './../interfaces/user-data.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  productsInCart$: Subject<string> = new Subject();

  patchProductsInCart(): void {
    this.productsInCart$.next('patch');
  }

  constructor(private http: HttpClient) { }

  getUserData(): Observable<UserData> {
    return this.http.get<any>(`${environment.dbUrl}/users/${localStorage.getItem('localId')}.json`)
      .pipe(
        map((userDataFb: object) => {
          for (const [id, data] of Object.entries(userDataFb)) {
            console.log(Object.entries(userDataFb));
            console.log(data);
            console.log({id, ...data});
            return {id, ...data};
          }
        })
      );
  }

  patchUserData(userData: UserData): Observable<any> {
    return this.http.patch(`${environment.dbUrl}/users/${localStorage.getItem('localId')}/${userData.id}.json`, userData);
  }
}
