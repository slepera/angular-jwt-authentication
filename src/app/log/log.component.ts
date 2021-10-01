import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent {
  @ViewChild('mydatatable') mydatatable: any;

  count = 50;
  rows: any[] = [];
  active = true;
  temp: any[] = [];
  cols: any = ['date', 'level', 'component', 'message'];
  log: any;

  constructor(private cd: ChangeDetectorRef, private userService: UserService) {
    this.userService.getLog(55).subscribe(
      data => this.rows = data
    );
    // this.fetch(data => {
    //   this.rows = data.map(d => {
    //     d.updated = Date.now().toString();
    //     return d;
    //   });

    //   this.temp = [...this.rows];
    // });
    //this.getLog(55);

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if (!this.active) {
      return;
    }

    setInterval(() => {this.getLog(50)}, 5000);
  }

  getLog(i:number):void{
    this.userService.getLog(i).subscribe(
      data => {
        this.rows = data.map(d => {
          d.updated = Date.now().toString();
          return d;
          });
        console.log(this.rows);
        this.temp = [...this.rows];}
    );
  }

  stop(): void {
    this.active = false;
  }

  add() {
    this.rows.splice(0, 0, this.temp[this.count++]);
  }

  remove() {
    this.rows.splice(0, this.rows.length);
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 5);
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];
    const rows = this.rows;

    if (rows.length) {
      const row = rows[rowNum];
      row[prop] = rows[newRow][prop];
      row.updated = Date.now().toString();
    }

    this.rows = [...this.rows];

    // this.cd.markForCheck();
    // this.mydatatable.update();
    this.start();
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response).file);
    };

    req.send();
  }
}
