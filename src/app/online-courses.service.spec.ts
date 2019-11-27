import { TestBed } from '@angular/core/testing';

import { OnlineCoursesService } from './online-courses.service';

describe('OnlineCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineCoursesService = TestBed.get(OnlineCoursesService);
    expect(service).toBeTruthy();
  });
});
