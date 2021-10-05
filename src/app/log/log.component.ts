import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { UserService } from '@app/_services/user.service';
import { interval, Observable, Subscription } from 'rxjs';
import { startWith, switchMap, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnDestroy{
  @ViewChild('mydatatable') mydatatable: any;

  count = 50;
  rows: any[] = [];
  active = true;
  temp: any[] = [];
  cols: any = ['date', 'level', 'component', 'message'];
  log: any;
  subscribtion: boolean
  i:number=0;
  lastId:number=-1;
  nmax=20;

  constructor(
    private authenticationService: AuthenticationService,  
    private userService: UserService) {
    this.getLog();
  }

  start(): void {  

  }

  getRowClass(row) {
    if(row.level === 'Info'){
      return 'level-info';
    }else if (row.level === 'Error'){
      return 'level-error';
    }else if (row.level === 'Warning'){
      return 'level-warning';
    };
  }
  getCellClass({ row, column, value }): any {
    return {
      'is-info': value === 'Info'
    };
  }
  getLog():void{
    if(this.authenticationService.currentUserValue!=undefined)
    {
      this.userService.getLog(this.lastId).subscribe(
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
                  this.rows= data.body.concat(this.rows);
                  if(this.rows.length>this.nmax){
                    this.rows=this.rows.slice(0, this.nmax);
                  }
                  this.lastId = this.rows[0].id+1;
                  console.log(this.rows);
                  this.getLog();                
              }
            }
        ,
        error =>
        {
              console.log("error");
              new Promise(resolve => setTimeout(resolve, 1000));
              this.getLog();
          }
  
      );    
    }    
  }

  stop(): void {

  }



  ngOnDestroy(): void{
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
