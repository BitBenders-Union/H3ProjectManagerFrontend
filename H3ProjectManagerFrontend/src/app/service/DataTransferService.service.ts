import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {
  private messageSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentMessage = this.messageSource.asObservable();

constructor() { }

  SendRecipie(item: any) {
    this.messageSource.next(item);
  }

}
