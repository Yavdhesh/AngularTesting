import {CoursesService} from './courses.service';
import {TestBed} from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES, LESSONS } from '../../../../server/db-data';
import { HttpErrorResponse } from '@angular/common/http';
import { fill } from 'cypress/types/lodash';
import { Lesson } from '../model/lesson';

describe('CourseServices',()=>{
let courseService:CoursesService;
let httpTestingController:HttpTestingController;
  beforeEach(()=>{

    TestBed.configureTestingModule({
      declarations:[],
      imports:[HttpClientTestingModule],
      providers:[
      CoursesService

      ]

    });

    courseService=TestBed.inject(CoursesService);
    httpTestingController=TestBed.inject(HttpTestingController);


  });

  it('CourseService should be initlaized',()=>{

    expect(courseService).toBeTruthy()


  });


  it('findAllCourses',()=>{
    courseService.findAllCourses().subscribe(courses=>{

      expect(courses).toBeTruthy('courses should not be null undefined');

      expect(courses.length).toBe(12,'12 courses hone chaahiye');

      const course=courses.find(course=>course.id==12);
      expect(course.titles.description).toBe("Angular Testing Course");


    });

    const req =httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toBe("GET");
    req.flush({payload:Object.values(COURSES)});

  });

  it('find A Specific course',()=>{

    courseService.findCourseById(12).subscribe(course=>{
      //console.log(course);
      expect(course.titles.description).toBe("Angular Testing Course");
      expect(course.lessonsCount).toBe(10,'This course has 10 lessons');

    })

    const req =httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toBe("GET");
    const course =COURSES[12];
    req.flush({...course});
    httpTestingController.verify();

  });


  it('should save the course',()=>{

    courseService.saveCourse(12,{lessonsCount:12}).subscribe((course)=>{
   console.log(course.lessonsCount);
   expect(course.lessonsCount).toBe(12);
    });

    const req=httpTestingController.expectOne('/api/courses/12','A put to request to save');
    expect(req.request.method).toBe("PUT");
    const course=COURSES[12];
    req.flush({...course,lessonsCount:12});
    httpTestingController.verify();


  })

  it('should err 500 save the course',()=>{

    courseService.saveCourse(12,{lessonsCount:12}).subscribe((course)=>{
  fail('it should not come here, go err callback');
    },(err:HttpErrorResponse)=>{
      //console.log(err);
      expect(err.status).toBe(500);
      expect(err.statusText).toBe('Internal Server Error');
    });

    const req=httpTestingController.expectOne('/api/courses/12','A put to request to save');
    expect(req.request.method).toBe("PUT");
    const course=COURSES[12];
    req.flush('failed',{status:500,statusText:'Internal Server Error'});
    httpTestingController.verify();


  });


  it('should search lessons based on course id',()=>{

    courseService.findLessons(12,'','asc',6,3)
    .subscribe((lessons:any)=>{
     console.log('kitne ',lessons);
      expect(lessons).toBeTruthy();
    });
    const req=httpTestingController.expectOne('/api/lessons?courseId=12&filter=&sortOrder=asc&pageNumber=6&pageSize=3');
    expect(req.request.method).toBe("GET");
    expect(req.request.params.get('courseId')).toEqual("12");
    expect(req.request.params.get('filter')).toEqual("");
    expect(req.request.params.get('sortOrder')).toEqual("asc");
    expect(req.request.params.get('pageNumber')).toEqual("6");
    expect(req.request.params.get('pageSize')).toEqual("3");
  const obj=Object.values(LESSONS).filter(lesson=>lesson.courseId==12).slice(0,3);
  console.log([...obj]);
    req.flush({payload:[...obj]}); //ye bhi dekh lo
    httpTestingController.verify();


  });

})
