import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-course',
  templateUrl: './main-course.component.html',
  styleUrls: ['./main-course.component.css']
})
export class MainCourseComponent implements OnInit {
  @Input() coursesList: any = [];
  p: number = 1;
  constructor() { }

  ngOnInit() {
  }

}
