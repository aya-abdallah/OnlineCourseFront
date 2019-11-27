import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnlineCoursesService } from '../online-courses.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngForm: FormGroup;
  userSubmitted: any;
  constructor(private onlineCoursesService: OnlineCoursesService, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.ngForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  submitUser(data) {
    this.userSubmitted='';
    const newUser = { firstName: data.firstName, lastName: data.lastName, password: data.password, email: data.email }
    this.onlineCoursesService.addUser(newUser).subscribe((res) => {
      this.userSubmitted = res['msg'];
      this.ngForm.reset();
      console.log("res = " , res);
    })
  }

}
