import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TmplAstBlockNode } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService<TModel, TInsert> {
  
// maybe it is better to make the methods generic and not the class
// that way we can choose what type of model we want to use with what method
// if the class is generic, we need to create multiple services if we want to use different models
  
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }
  
  getAll(endpoint: string, userId: number) : Observable<TModel[]> {
    return this.http.get<TModel[]>(this.url + endpoint + "/" + userId);
  }


  delete(endpoint: string, id: number) : Observable<any> {
    return this.http.delete<TModel>(this.url + endpoint + "/" + id);
  }
  
  create(endpoint: string, model: TInsert): Observable<TModel>{
    return this.http.post<TModel>(this.url + endpoint, model);
  }
}

