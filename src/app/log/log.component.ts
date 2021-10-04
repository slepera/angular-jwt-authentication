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
  }

 
  getLog():void{
    this.userService.getLog(this.lastId+1).subscribe(
      data => 
      {
        if (data.status != 200) 
        {
            console.log("diverso da 200");
            console.log(data.statusText);
            new Promise(resolve => setTimeout(resolve, 1000));
            this.getLog();
        } 
        else 
        {
            console.log("uguale a 200");
            console.log(data.status + "  " + data.statusText); 
            console.log(this.rows);
            console.log(data.body);
            this.rows= this.rows.concat(data.body);
            if(this.rows.length>this.nmax){
              this.rows=this.rows.slice(this.rows.length-this.nmax);
            }
            this.lastId = this.rows[this.rows.length-1].id;
            console.log(this.rows);
            this.getLog();
        }
    },
    error =>
    {
      console.log("error");
      new Promise(resolve => setTimeout(resolve, 1000));
      this.getLog();
    }

    );
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

  async subscribe() {
    let response = await fetch("/subscribe");
  
    if (response.status == 502) {
      // Status 502 is a connection timeout error,
      // may happen when the connection was pending for too long,
      // and the remote server or a proxy closed it
      // let's reconnect
      await this.subscribe();
    } else if (response.status != 200) {
      // An error - let's show it
      console.log(response.statusText);
      // Reconnect in one second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.subscribe();
    } else {
      // Get and show the message
      let message = await response.text();
      console.log(message);
      // Call subscribe() again to get the next message
      await this.subscribe();
    }
  }


}
