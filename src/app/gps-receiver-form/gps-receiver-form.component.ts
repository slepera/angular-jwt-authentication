import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gps-receiver-form',
  templateUrl: './gps-receiver-form.component.html',
  styleUrls: ['./gps-receiver-form.component.css']
})
export class GpsReceiverFormComponent implements OnInit {
  @Input() operationType:String;
  GPSData:FormGroup;
  param: String[];
  myArray: FormGroup[]=[];
  prova: number;
  values: String[];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.param = ['Xbias', 'Ybias', 'Zbias', 'Vxbias', 'Vybias', 'Vzbias', 'TimeTagBias'];
    this.values = ['process_action', 'sigma', 'process_noise', 'value'];
    for(let i = 0; i<this.param.length; i++){
      this.myArray.push(this.createForm('process_action', 'sigma', 'process_noise', 'value'));
    }

    this.GPSData = this.fb.group({
      arr: this.fb.array(this.myArray)
    })

    // this.GPSData = new FormGroup({
    //   'TimeTagBias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //   'Xbias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //   'Ybias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //   'Zbias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //   'Vxbias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //   'Vybias': this.createForm('process_action', 'sigma', 'process_noise', 'value'),
    //   'Vzbias': this.createForm('process_action', 'sigma', 'process_noise', 'value')
    // });
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
    console.log(this.GPSData);
    this.prova = this.GPSData.value['arr'][this.param.indexOf('Xbias')]['sigma'];
  }


}
