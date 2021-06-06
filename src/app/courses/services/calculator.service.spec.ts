import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import { async, TestBed } from '@angular/core/testing';

describe('CalculatporService',()=>{

  let loggerService:any;
  let calculatorSer:CalculatorService;

  beforeEach(()=>{
     loggerService=jasmine.createSpyObj('LoggerService',['log']);

     TestBed.configureTestingModule({
       providers:[CalculatorService,{provide:LoggerService,useValue:loggerService}]

     });
     // TestBed.get is deprecated now, ab inject ka upyog kare
     calculatorSer=TestBed.inject(CalculatorService);

  });

it('two number added',()=>{


 // spyOn(loggerService,'log');

  let output=calculatorSer.add(3,6);

  expect(output).toBe(9,'sum of the numbers');
  expect(loggerService.log).toHaveBeenCalledTimes(1);



});

it('should subtratc',()=>{

  let output=calculatorSer.subtract(3,6);

  expect(output).toBe(-3,'result of subtraction');
});

it('0-0',()=>{

  let output=calculatorSer.subtract(0,0);

  expect(output).toBe(0,'result of subtraction');
});

})
