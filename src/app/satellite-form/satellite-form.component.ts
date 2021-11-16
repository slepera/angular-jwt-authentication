import { Component, Input, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-satellite-form',
  templateUrl: './satellite-form.component.html',
  styleUrls: ['./satellite-form.component.css']
})
export class SatelliteFormComponent implements OnInit {
  @Input() operationType:String;
  SatData:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.SatData = new FormGroup({
      'x': this.createForm('sigma', 'process_noise', 'value'),
      'y': this.createForm('sigma', 'process_noise', 'value'),
      'z': this.createForm('sigma', 'process_noise', 'value'),
      'vx': this.createForm('sigma', 'process_noise', 'value'),
      'vy': this.createForm('sigma', 'process_noise', 'value'),
      'vz': this.createForm('sigma', 'process_noise', 'value'),
      'cd': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
      'cr': this.createForm('process_action', 'sigma', 'process_noise', 'value')    
  });
  }

  createForm(A:string, B:string,C:string, D?:string){
    if(D){
      return new FormGroup({
        [A] : new FormControl(null,[Validators.required]),
        [B] : new FormControl(null,[Validators.required]),
        [C] : new FormControl(null,[Validators.required]),
        [D] : new FormControl(null,[Validators.required])
      })
    }
    return new FormGroup({
      [A] : new FormControl(null,[Validators.required]),
      [B] : new FormControl(null,[Validators.required]),
      [C] : new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    console.log(this.SatData);
    console.log(this.operationType);
  }

}
