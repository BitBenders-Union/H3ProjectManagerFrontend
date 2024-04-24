import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TmplAstBlockNode } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService<TModel, TResponse> {
  
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }
  
  getAll() : Observable<TModel[]> {
    return this.http.get<TModel[]>(this.url);
  }


  delete(model: TModel) : boolean {
    this.http.delete<TModel>(this.url, {
      body: model
    }).subscribe({
      next: data => {
        console.log(data);
        return true;
      },
      error: error => {
        console.error('There was an error!', error);
        return false;
      }
    });
    return false;
  }
  
  create(endpoint: string, model: TResponse): Observable<TModel>{
    return this.http.post<TModel>(this.url + endpoint, model);
  }
}

