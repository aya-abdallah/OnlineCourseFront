import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { OnlineCoursesService } from '../online-courses.service';
import { MainCourseComponent } from '../main-course/main-course.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  categories: object;
  courses: object;
  allCourses: any = [];
  categoriesList: any = []
  currentCourseList: any = [];
  p: number = 1;
  @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;

  constructor(private onlineCoursesService: OnlineCoursesService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getAllCoursesWithCategory();
    this.onlineCoursesService.getAllCategories().subscribe(categories => {
      this.categoriesList = categories;
    });
  }
  getAllCoursesWithCategory() {
    this.onlineCoursesService.getAllCoursesWithCategory().subscribe(allCourses => {
      this.allCourses = allCourses;
      this.currentCourseList = allCourses;
      this.courseComponent();
      console.log("all = ", this.allCourses)
    });
  }
  filterCourses(event) {
    if (event.target.value !== "all") {
      this.onlineCoursesService.getAllCoursesOfCategory(event.target.value).subscribe(courses => {
        this.currentCourseList = courses
        console.log("all = ", this.currentCourseList)
        this.courseComponent();
      })
    } else {
      this.currentCourseList = this.allCourses;
      this.courseComponent();
    }
  }
  courseComponent() {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MainCourseComponent);
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.coursesList = this.currentCourseList;
  }
}
