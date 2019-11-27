import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component'
import { UserPageComponent } from './user-page/user-page.component'
import { AdminPageComponent } from './admin-page/admin-page.component'

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'user',
    component: UserPageComponent
  }, {
    path: 'admin',
    component: AdminPageComponent
  },
  // {
  //   path: 'categories/:id',
  //   component: MainPageComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
