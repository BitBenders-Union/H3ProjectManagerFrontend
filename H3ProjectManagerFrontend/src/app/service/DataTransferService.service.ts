import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {
  
  // BehaviorSubject for managing and updating the message
  private messageSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  // Observable to subscribe to the current message
  public currentMessage = this.messageSource.asObservable();

  constructor() { }

  // Method for sending the recipe item
  SendTask(item: any) {
    // Update the message source with the new item
    this.messageSource.next(item);
  }

}

// So when the SendTask method is called, it updates the message source with the new item, and all subscribers to the currentMessage observable will receive the updated message.
// In this case the task details are sent from the TaskComponent to the TaskDetailsComponent. 
//The TaskComponent calls the SendTask method to send the task details, and the TaskDetailsComponent subscribes to the currentMessage observable to receive the task details. 
//This allows for communication between the two components.
