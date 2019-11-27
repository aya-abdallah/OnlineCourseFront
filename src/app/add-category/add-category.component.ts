import { Component, OnInit } from '@angular/core';
import { AdminPageComponent } from '../admin-page/admin-page.component'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoriesList: any = [];
  adminPageComponent: AdminPageComponent;
  constructor(public _parent: AdminPageComponent) {
  }

  ngOnInit() {
  }

}
