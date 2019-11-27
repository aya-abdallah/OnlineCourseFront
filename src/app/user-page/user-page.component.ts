import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OnlineCoursesService } from '../online-courses.service';
import { CoursesComponent } from '../courses/courses.component';
import { UserPointComponent } from '../user-point/user-point.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  currentUser: string;
  allCourses: object;
  categoriesList: any = [];
  currentCourseList: any = [];
  registeredCoursesId: any = [];
  registeredCourses: any = [];
  compeletedCourses: any = [];
  userPoints: any;
  @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  @ViewChild('point', { read: ViewContainerRef, static: false }) point: ViewContainerRef;

  constructor(private cookieService: CookieService, private onlineCoursesService: OnlineCoursesService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.currentUser = this.cookieService.get("currentUser");
    console.log("current user = ", this.cookieService.get("userId"));
    this.getAllCategories();
    this.getAllCompeletedCourseUser();
    this.getAllCoursesWithCategory();
    this.getAllRegisteredCourses();
    this.getUserPoints();
  }

  getAllCategories() {
    this.onlineCoursesService.getAllCategories().subscribe(categories => {
      this.categoriesList = categories;
      this.courseComponent();
    });
  }

  getAllCoursesWithCategory() {
    this.onlineCoursesService.getAllCoursesWithCategory().subscribe(allCourses => {
      this.currentCourseList = allCourses;
      this.courseComponent();
    })
  }

  getUserPoints() {
    this.onlineCoursesService.getUserPoints(this.cookieService.get("userId"))
      .subscribe(point => {
        this.userPoints = point;
        this.pointComponent();
        console.log("points = ", this.userPoints);
      })
  }

  filterCourses(event) {
    if (event.target.value !== "all") {
      this.onlineCoursesService.getAllCoursesOfCategory(event.target.value).subscribe(courses => {
        this.currentCourseList = courses;
        console.log("all = ", this.currentCourseList)
        this.courseComponent();
      })
    } else {
      this.getAllCoursesWithCategory()
    }
  }

  registerCourse(event, courseId) {
    if (event.target.value === "Register") event.target.value = "Remove Register"
    else event.target.value = "Register"
    this.onlineCoursesService.registerCourse({ userId: this.cookieService.get("userId"), courseId: courseId })
      .subscribe((res) => {
        console.log("hello");
        this.getAllRegisteredCourses();
      })
  }

  getAllRegisteredCourses() {
    this.onlineCoursesService.getRegisterCourses(this.cookieService.get("userId")).subscribe(courses => {
      this.registeredCoursesId = courses["coursesId"];
      this.registeredCourses = courses["allRegister"];
      this.registeredCoursesId = JSON.stringify(this.registeredCoursesId);
      console.log("reg = ", this.registeredCourses);
      this.courseComponent();
    });
  }

  getAllCompeletedCourseUser() {
    this.onlineCoursesService.getAllCompeletedCourseUser(this.cookieService.get("userId"))
      .subscribe(courses => {
        this.compeletedCourses = courses;
        this.compeletedCourses = JSON.stringify(this.compeletedCourses);
        this.courseComponent();
        console.log("c = ", this.compeletedCourses);
      })
  }
  completeCourse(courseId, points) {
    this.onlineCoursesService.compeleteCourse(
      { userId: this.cookieService.get("userId"), courseId: courseId, points: points })
      .subscribe((courses) => {
        this.getAllCompeletedCourseUser()
        this.getUserPoints();
      })
  }

  //filter registeres courses
  showRegistered() {
    this.getAllRegisteredCourses();
    this.currentCourseList = this.registeredCourses;
    console.log("1 ", this.currentCourseList)
    console.log("2 ", this.registeredCourses)
    this.courseComponent();
  }
  showCompleted() {
    this.currentCourseList = this.compeletedCourses;
    this.courseComponent();
  }
  courseComponent() {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CoursesComponent);
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.coursesList = this.currentCourseList;
    componentRef.instance.compeletedCourses = this.compeletedCourses;
    componentRef.instance.registeredCourses = this.registeredCoursesId;
  }
  pointComponent() {
    this.point.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserPointComponent);
    const componentRef = this.point.createComponent(componentFactory);
    componentRef.instance.userPoints = this.userPoints;
  }

}
