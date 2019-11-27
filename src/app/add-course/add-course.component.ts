import { Component, OnInit } from '@angular/core';
import { AdminPageComponent} from '../admin-page/admin-page.component'

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  coursesList :any=[];
  constructor(public _parent: AdminPageComponent) { }

  ngOnInit() {
  }

}
