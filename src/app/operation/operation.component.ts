import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

interface Operation{
  value: number;
  viewedValue: string;
}

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  operationType: number;
  operations: Operation[] = [
    {value: 0, viewedValue: "Navigation Kalman"},
    {value: 1, viewedValue: "Navigation Batch"},
    {value: 2, viewedValue: "Ranging Kalman"},
    {value: 3, viewedValue: "Ranging Batch"},

  ];

  
  GPSData:FormGroup;

  constructor() { }

  ngOnInit(): void {
    

    // this.GPSData = new FormGroup({
    //     'time_tagged_bias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //     'Xbias': this.createForm('process_action', 'sigma', 'process_noise', 'value'), 
    //     'Ybias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //     'Zbias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //     'Vxbias': this.createForm('process_action', 'sigma', 'process_noise', 'value'), 
    //     'Vybias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //     'Vzbias': this.createForm('process_action', 'sigma', 'process_noise', 'value')    
    // });
    
  }

  

  

}
