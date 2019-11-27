import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OnlineCoursesService {

  uri = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  headers = new HttpHeaders().set("Authorization", "Token " + this.cookieService.get("token"));
  httpOptions = {
    headers: this.headers
  };
  addUser(data) {
    return this.http.post(`${this.uri}/users`, data, this.httpOptions);
  }
  addAdmin(data) {
    this.http.post(`${this.uri}/users/admin`, data, this.httpOptions)
      .subscribe(res => console.log('Done'));
  }

  addCategory(data) {
    return this.http.post(`${this.uri}/categories/`, data, this.httpOptions);
  }

  addCourse(data) {
    return this.http.post(`${this.uri}/courses/`, data, this.httpOptions);
  }
  validateUser(data) {
    return this.http.post(`${this.uri}/users/login`, data, this.httpOptions);
  }
  activeAndDisactiveUser(id) {
    return this.http.put(`${this.uri}/users/${id}`, {}, this.httpOptions);
  }
  getAllCategories() {
    return this.http.get(`${this.uri}/categories`);
  }
  getAllUsers() {
    return this
      .http
      .get(`${this.uri}/users`, this.httpOptions);
  }
  getAllCourses() {
    return this
      .http
      .get(`${this.uri}/courses`);
  }

  getAllCoursesOfCategory(categoryId) {
    return this
      .http
      .get(`${this.uri}/coursecategories/${categoryId}`);
  }

  getAllCoursesWithCategory() {
    return this
      .http
      .get(`${this.uri}/coursecategories`);
  }
  deleteCourse(id) {
    return this.http.delete(`${this.uri}/courses/${id}`, this.httpOptions);
  }
  deleteCategory(id) {
    return this.http.delete(`${this.uri}/categories/${id}`, this.httpOptions);
  }
  deleteCategoryFromCourse(courseId, categoryId) {
    return this.http.delete(`${this.uri}/coursecategories/${courseId}/${categoryId}`, this.httpOptions);
  }

  editCategory(categoryName, id) {
    return this.http.put(`${this.uri}/categories/${id}`, { name: categoryName }, this.httpOptions);
  }
  editCourse(newCourse, id) {
    return this.http.put(`${this.uri}/courses/${id}`, newCourse, this.httpOptions);
  }
  registerCourse(data) {
    return this.http.post(`${this.uri}/registercourses`, data, this.httpOptions);
  }
  compeleteCourse(data) {
    return this.http.post(`${this.uri}/compeletecourses`, data, this.httpOptions);
  }
  getRegisterCourses(userId) {
    return this.http.get(`${this.uri}/registercourses/${userId}`, this.httpOptions);
  }
  getAllCompeletedCourseUser(userId) {
    return this.http.get(`${this.uri}/compeletecourses/${userId}`, this.httpOptions);
  }
  getUserPoints(userId) {
    return this.http.get(`${this.uri}/compeletecourses/points/${userId}`, this.httpOptions);
  }
}
