import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGenericMethodsService {

  url: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAll<TModel>(endpoint: string, userId: number): Observable<TModel[]>{
    return this.http.get<TModel[]>(`${this.url}${endpoint}/${userId}`);
  }

  getAllSimple<Tmodel>(endpoint: string): Observable<Tmodel[]>{
    return this.http.get<Tmodel[]>(`${this.url}${endpoint}`);
  }

  post<TReturn, TInsert>(endpoint: string, userId: number, model: TInsert): Observable<TReturn>{
    return this.http.post<TReturn>(`${this.url}${endpoint}/${userId}`, model);
  }


  // some method for the tavle
  //#region 
  address: string = "Falkevej45";

  getAddress() {
    let address2 = "";

    for(let i = 1; i < this.address.length+1; i++) {
      if(i % 3 == 0)
        {
          address2 += this.address[i-1];
        }
    }

    console.log("hej");
    console.log(address2);
  }

  //#endregion

}
