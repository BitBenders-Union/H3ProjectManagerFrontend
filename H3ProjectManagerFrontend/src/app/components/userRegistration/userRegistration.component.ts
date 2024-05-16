import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { UserDetail } from '../../models/UserDetail';
import { TokenModel } from '../../models/Token';
import { Router } from '@angular/router';
import { compareValidator } from '../../service/customValidation';
import { User } from '../../models/user';

@Component({
  selector: 'app-userRegistration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './userRegistration.component.html',
  styleUrls: ['./userRegistration.component.css']
})
export class UserRegistrationComponent {

  constructor(
    private service: ApiServiceService<User, UserDetail>,
    private route: Router
  ) { }

  endpoint: string = "Auth"

  userModel?: UserDetail;
  user?: User


  registerForm: FormGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('',[Validators.required]),
      genPassword: new FormControl('', [Validators.required])
    },
    {
      validators: compareValidator('password', 'genPassword')
    }
  );

  firstNameForm = this.registerForm.get('firstName');
  lastNameForm = this.registerForm.get('lastName');
  userNameForm = this.registerForm.get('username');
  passwordForm = this.registerForm.get('password');
  genPasswordForm = this.registerForm.get('genPassword');


  // pass1: string = "test"
  // pass2: string = "test "
  // passError: boolean = false;

  // validateCompare(): void {
  //   if(this.pass1 == this.pass2){
  //     this.passError = true;
  //   }
  //   console.log("PassError " + this.passError);
  // }

  onSubmit(): void {
    //get value from form
    const submitForm = {...this.registerForm.value};
    //remove genpassword from submitted form
    delete submitForm.genPassword;

    this.userModel = submitForm;

    this.service.create(this.endpoint, this.userModel!).subscribe({
      next: data =>{
        this.user = data
        console.log(this.user)
      },
      error: error =>
        {
          console.error(error);
        },
        complete: () => {
          this.route.navigate(["/login"])
        }
    })
    console.log(this.userModel);


  }

}
