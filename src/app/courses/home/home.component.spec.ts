import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';
import { createComponent } from '@angular/compiler/src/core';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursrService:any;
  let beginnerCourses=setupCourses()
  .filter(course=>course.category=='BEGINNER');
  let advanceCourse=setupCourses().filter(course=>course.category=='ADVANCED');

  beforeEach(waitForAsync(() => {
    const courseServiceSpy=jasmine.createSpyObj('CoursesService',['findCourseById','findAllCourses','saveCourse','findLessons']);
TestBed.configureTestingModule({
  imports:[CoursesModule,
  NoopAnimationsModule]
  ,providers:[{provide:CoursesService,useValue:courseServiceSpy}]
}).compileComponents().then(()=>{
fixture=TestBed.createComponent(HomeComponent);
component=fixture.componentInstance;
el=fixture.debugElement;
coursrService=TestBed.inject(CoursesService);


})

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

     coursrService.findAllCourses
   .and
   .returnValue(of(beginnerCourses
   ));

   fixture.detectChanges();

   const tabs=el.queryAll(By.css('.mat-tab-label'));
   expect(tabs.length).toBe(1,'ek nhi hzi')
  // console.log(tabs)

  });


  it("should display only advanced courses", () => {

     coursrService
     .findAllCourses
     .and.
     returnValue(of(advanceCourse));

     fixture.detectChanges();

     const tabs=el.queryAll(By.css('.mat-tab-label'));
    // console.log(tabs);
     expect(tabs.length).toBe(1,'keval advance course hi hone chahiye the');

  });


  it("should display both tabs", () => {

    coursrService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs=el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(2,'dono tabs dikhne chahiye');

  });


  it("should display advanced courses when tab clicked FakeAsync",fakeAsync( () => {

 coursrService
 .findAllCourses
 .and.
 returnValue(of(setupCourses()));
 fixture.detectChanges();
 const tabs=el.queryAll(By.css('.mat-tab-label'));
 expect(tabs.length).toBe(2,'dono tabs dikhne chahiye');
  click(tabs[1]);
  fixture.detectChanges();
  tick(10000);
  fixture.detectChanges();
  const cardTitles=el.queryAll(By.css('.mat-card-title'));
  console.log(cardTitles);
  expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");




 //flush();

  }));

  it("should display advanced courses when tab clicked Done", (done:DoneFn) => {

    coursrService
    .findAllCourses
    .and.
    returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs=el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2,'dono tabs dikhne chahiye');
     click(tabs[1]);
     fixture.detectChanges();
     //tick(10000);
     setTimeout(()=>{
      fixture.detectChanges();
      const cardTitles=el.queryAll(By.css('.mat-card-title'));
      console.log('Done waalaa',cardTitles);
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
      done();
     },2000);





    //flush();

     });


  it("should display advanced courses when tab clicked fakeAsync => flush", fakeAsync((done:DoneFn) => {

    coursrService
    .findAllCourses
    .and.
    returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs=el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2,'dono tabs dikhne chahiye');
     click(tabs[1]);
     fixture.detectChanges();

      flush();

    fixture.detectChanges();
    const cardTitles=el.queryAll(By.css('.mat-card-title'));
    console.log('Done waalaa',cardTitles);
    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");






    //flush();

     }));

     fit('flushMicrotasks',fakeAsync(()=>{

      let test=false;

      Promise.resolve('resolve1').then(arg=>{
        console.log(' pehla then',arg);
        return Promise.resolve('resolve 2');
      }).then(arg2=>{
        console.log(' dusra then',arg2);
        test=true;
      })
//1. flush se karo
   //   flush();
 //2. flushMicrotasks se karo
 flushMicrotasks();

 //3. tick se karo
 //tick(3000);

expect(test).toBeTruthy('True nhi hua');

    }));


});


