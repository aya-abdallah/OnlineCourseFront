import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { OnlineCoursesService } from './online-courses.service' ;
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CookieService } from 'ngx-cookie-service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ModalModule } from 'ngb-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { MainCourseComponent } from './main-course/main-course.component';
import { UserPointComponent } from './user-point/user-point.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MainPageComponent,
    UserPageComponent,
    AdminPageComponent,
    CoursesComponent,
    AddCourseComponent,
    MainCourseComponent,
    UserPointComponent,
    AddCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    NgbModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot([  
      // { path: 'signup', component: SignupComponent },  
      { path: 'login', component: LoginComponent },  

     ]),  
  ],
  providers: [ OnlineCoursesService,CookieService ],
  bootstrap: [AppComponent],
  entryComponents: [CoursesComponent,AddCourseComponent,MainCourseComponent,UserPointComponent,AddCategoryComponent]
})
export class AppModule { }
