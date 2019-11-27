
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnlineCoursesService } from '../online-courses.service';
import { ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngForm: FormGroup;
  err: boolean = false;
  loginMessage: object = null;
  constructor(private onlineCoursesService: OnlineCoursesService, private fb: FormBuilder,
    private cdr: ChangeDetectorRef, private router: Router, private cookieService: CookieService) {
    this.createForm();
  }
  createForm() {
    this.ngForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
  }

  loginUser(data) {

    const user = { password: data.password, email: data.email }
    this.onlineCoursesService.validateUser(user).subscribe(res => {
      this.loginMessage = res;
      if (typeof (res["user"]) === "undefined") {
        this.err = true;
      } else {
        this.cookieService.set("token",res["user"]["token"]);
        this.cookieService.set("userId",res["user"]["_id"]);
        this.cookieService.set("currentUser", res["user"]["firstName"] + " " + res["user"]["lastName"]);
        if(res["user"]["isAdmin"]==1){
          this.router.navigate(['/admin'], res["admin"]);
        }else{
          this.router.navigate(['/user'], res["user"]);
        }
      }
      this.cdr.markForCheck();
      console.log("res = ", this.loginMessage)
    });
  }

}
