import { UserData } from './../interfaces/user-data.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<UserData> {
    return this.http.get<any>(`${environment.dbUrl}/users/${localStorage.getItem('localId')}.json`)
      .pipe(
        map((userDataFb: object) => {
          for (const [id, data] of Object.entries(userDataFb)) {
            return {id, ...data};
          }
        })
      );
  }

  patchUserData(userData: UserData): Observable<any> {
    return this.http.patch(`${environment.dbUrl}/users/${localStorage.getItem('localId')}/${userData.id}.json`, userData);
  }
}
