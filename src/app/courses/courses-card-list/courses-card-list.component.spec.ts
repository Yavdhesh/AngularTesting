import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import { before } from 'cypress/types/lodash';




describe('CoursesCardListComponent', () => {

  let courseComponent:CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let debugEl:DebugElement;

  beforeEach(waitForAsync (()=>{

    TestBed.configureTestingModule({
      imports:[CoursesModule]
    })
    .compileComponents().then(()=>{
     fixture=TestBed.createComponent(CoursesCardListComponent);
     courseComponent=fixture.componentInstance;
     debugEl=fixture.debugElement;

    })

  }));


  it("should create the component", () => {

   expect(courseComponent).toBeTruthy();

  });


  it("should display the course list", () => {

    courseComponent.courses=setupCourses();

    fixture.detectChanges();// here detectCHanges is also synchronous

    //console.log(debugEl.nativeElement.outerHTML);
    const cards=debugEl.queryAll(By.css('.course-card.mat-elevation-z10'));
    expect(cards.length).toBe(12,'not corrct number of components');
    //pending();

  });


  it("should display the first course", () => {

    courseComponent.courses=setupCourses();
    let firstCourse:Course=setupCourses()[0];
    fixture.detectChanges();// here detectCHanges is also synchronous
    const cards=debugEl.query(By.css('.course-card.mat-elevation-z10:first-child'));
    const title=cards.query(By.css('mat-card-title'));
    //console.log(title.nativeElement.textContent);
    expect(title.nativeElement.textContent).toBe(firstCourse.titles.description);
    //console.log(cards);
  });


});


