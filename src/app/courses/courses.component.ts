import { Component, OnInit, Input } from '@angular/core';
import { UserPageComponent } from '../user-page/user-page.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  @Input() coursesList: any = [];
  @Input() registeredCourses: any = [];
  @Input() compeletedCourses: any = [];

  constructor(public _parent: UserPageComponent) { }

  ngOnInit() {
  }


}
