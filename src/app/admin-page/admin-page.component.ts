import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OnlineCoursesService } from '../online-courses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  categoriesList: any = [];
  selectedCategories: any = [];
  dropdownSettings: IDropdownSettings = {};
  currentUser: string;
  allCourses: object;
  allUsers: object;
  allCategories: object;
  closeResult: string;
  display = 'none';
  usersDisplay = 'none';
  backdropDisplay = 'none';
  categoryDisplay = 'none';
  courseDisplay = 'none';
  editCategoryDisplay = 'none';
  editCourseDisplay = 'none'
  adminForm: FormGroup;
  categoryForm: FormGroup;
  courseForm: FormGroup;
  editCourseForm: FormGroup;
  editedCategory: object;
  editedCourse: object;
  token: string = "";
  path:any;
  @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  @ViewChild('category', { read: ViewContainerRef, static: false }) category: ViewContainerRef;

  constructor(private cookieService: CookieService, private onlineCoursesService: OnlineCoursesService,
    private fb: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) {
    this.validateForm();
  }
  validateForm() {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.courseForm = this.editCourseForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      points: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.token = this.cookieService.get("token");
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.currentUser = this.cookieService.get("currentUser");

    this.getAllCourses();
    this.getAllCategories();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
       this.path = event.target.files[0];
      // this.courseForm.get('file').setValue(path);
    }
  }

  addAdmin(data) {
    const newAdmin = { firstName: data.firstName, lastName: data.lastName, password: data.password, email: data.email }
    this.onlineCoursesService.addAdmin(newAdmin);
    this.closeAdminDialog();
  }

  addCategory(data) {
    this.onlineCoursesService.addCategory(data).subscribe(() => {
      this.getAllCategories();
    })
    this.closeCategoryModal();
  }
  addCourse(data) {
    console.log(data);
    data.file=this.path;
    this.onlineCoursesService.addCourse(data).subscribe(() => {
      this.getAllCourses();
    });
    this.closeCourseModal();
  }
  editCourse(newCourse) {
    this.onlineCoursesService.editCourse(newCourse, this.editedCourse["courseId"]["_id"]).subscribe(() => {
      this.getAllCourses();
    })
    this.closeEditCourseModal();
  }
  deleteCourse(event) {
    this.onlineCoursesService.deleteCourse(event.target.id).subscribe(() => {
      this.getAllCourses();
    })
  }


  getAllCourses() {
    this.onlineCoursesService.getAllCoursesWithCategory().subscribe(allCourses => {
      this.allCourses = allCourses;
      this.courseComponent();
    });
  }
  getAllCategories() {
    this.onlineCoursesService.getAllCategories().subscribe(categories => {
      this.categoriesList = categories;
      console.log("cat = ", this.categoriesList);
      this.categoryComponent();
    });
  }


  deleteCategory(category) {
    this.onlineCoursesService.deleteCategory(category._id).subscribe(() => {
      this.getAllCategories();
      this.getAllCourses();
    });
  }

  editCategory(category) {
    this.onlineCoursesService.editCategory(category.name, this.editedCategory["_id"]).subscribe(() => {
      this.getAllCategories();
      this.getAllCourses();
    });
    this.closeEditCategoryModal();
  }

  deleteCategoryFromCourse(courseId, category) {
    this.onlineCoursesService.deleteCategoryFromCourse(courseId, category._id).subscribe(() => {
      this.getAllCourses();
    })
  }

  getAllUsers() {
    this.onlineCoursesService.getAllUsers().subscribe(users => this.allUsers = users);

  }
  activeUserToggle(event) {
    if (event.target.value === "disactive") event.target.value = "active";
    else event.target.value = "disactive";
    this.onlineCoursesService.activeAndDisactiveUser(event.target.id).subscribe(() => console.log("Done"));
  }

  openEditCategoryModal(category) {
    this.editedCategory = category;
    this.backdropDisplay = 'block';
    this.editCategoryDisplay = 'block';
    console.log("edit = ", this.editedCategory)
  }
  openEditCourseModal(course) {
    this.editedCourse = course;
    this.selectedCategories = course.categoryId;
    console.log("edit course = ", this.editedCourse);
    this.backdropDisplay = 'block';
    this.editCourseDisplay = 'block';
  }
  openAdminModal() {
    this.adminForm.reset();
    this.backdropDisplay = 'block';
    this.display = 'block';
  }
  openUsersModal() {
    this.getAllUsers();
    this.backdropDisplay = 'block';
    this.usersDisplay = 'block';
  }
  openCategoryModal() {
    this.categoryForm.reset();
    this.backdropDisplay = 'block';
    this.categoryDisplay = 'block';
  }
  openCourseModal() {
    this.courseForm.reset();
    this.backdropDisplay = 'block';
    this.courseDisplay = 'block';
  }

  closeUsersModal() {
    this.backdropDisplay = 'none';
    this.usersDisplay = 'none';
  }
  closeAdminDialog() {
    this.backdropDisplay = 'none';
    this.display = 'none';
  }
  closeCategoryModal() {
    this.backdropDisplay = 'none';
    this.categoryDisplay = 'none';
  }
  closeCourseModal() {
    this.backdropDisplay = 'none';
    this.courseDisplay = 'none';
  }
  closeEditCategoryModal() {
    this.backdropDisplay = 'none';
    this.editCategoryDisplay = 'none';
  }
  closeEditCourseModal() {
    this.backdropDisplay = 'none';
    this.editCourseDisplay = 'none';
  }
  logout() {
    this.cookieService.delete("token");
  }
  courseComponent() {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddCourseComponent);
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.coursesList = this.allCourses;
  }
  categoryComponent() {
    this.category.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddCategoryComponent);
    const componentRef = this.category.createComponent(componentFactory);
    componentRef.instance.categoriesList = this.categoriesList;
  }

}

