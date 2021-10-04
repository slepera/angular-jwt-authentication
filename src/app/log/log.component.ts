import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@app/_services/user.service';
import { interval, Observable, Subscription } from 'rxjs';
import { startWith, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnDestroy{
  @ViewChild('mydatatable') mydatatable: any;

  count = 50;
  rows: any[] = [{"component": "Prova",
  "date": "2021-10-04 at 10:03:21 CEST", "id": 85, "level": "Info", "message": "Messaggio di prova."}];
  active = true;
  temp: any[] = [];
  cols: any = ['date', 'level', 'component', 'message'];
  log: any;
  subscribtion: any;
  i:number=0;
  lastId:number=50;
  nmax=20;
  timeInterval: Subscription;

  constructor(private userService: UserService) {
    this.start();
  }

  start(): void {
    this.active = true;
    this.getLog();
    // setInterval(() => {
    //   if (this.active){
    //     this.getLog(50+this.i);
    //     this.i++;
    //   }else{
    //     return;
    //   }
    //   }, 5000);
  }

  getLog():void{
    this.timeInterval = interval(5000)
    .pipe(
      switchMap(()=>this.userService.getLog(this.lastId+1)),
      takeWhile(val => this.active)
    ).subscribe(data => {
          console.log(this.rows);
          console.log(data);
          this.rows= this.rows.concat(data);
          if(this.rows.length>this.nmax){
            this.rows=this.rows.slice(this.rows.length-this.nmax);
          }
          this.lastId = this.rows[this.rows.length-1].id;
          console.log(this.rows);
        });
    
    // this.subscribtion = this.userService.getLog(i).subscribe(
    //   data => {
    //     console.log(this.rows);
    //     console.log(data);
    //     this.rows= this.rows.concat(data);
    //     if(this.rows.length>this.nmax){
    //       this.rows=this.rows.slice(this.rows.length-this.nmax);
    //     }
    //     console.log(this.rows);
    //   }
    // );
  }

  stop(): void {
    this.active = false;
  }

  add() {
    this.rows.splice(0, 0, this.temp[this.count++]);
  }

  ngOnDestroy(): void{
    this.timeInterval.unsubscribe();
    this.subscribtion.unsubscribe();
  }

}
