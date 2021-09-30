import { Component, OnInit } from '@angular/core';
import {LogMessage as NgxLogMessage} from 'ngx-log-monitor';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SseService } from './sse.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {
  constructor(private sseService: SseService){}

  ngOnInit() {
    this.sseService
      .getServerSentEvent(`/api/log/stream-sse-mvc`)
      .subscribe(data => {
        console.log(data);
      }
      );
  }

  restoredLogs: NgxLogMessage[] = [
    {message: 'A simple restored log message'},
    {message: 'A success restored message', type: 'SUCCESS'},
    {message: 'A warning restored message', type: 'WARN'},
    {message: 'An error restored message', type: 'ERR'},
    {message: 'An info restored message', type: 'INFO'},
  ];

  logs: NgxLogMessage[] = [
    {message: 'A simple log message'},
    {message: 'A success message', type: 'SUCCESS'},
    {message: 'A warning message', type: 'WARN'},
    {message: 'An error message', type: 'ERR'},
    {message: 'An info message', type: 'INFO'},
  ];

  logStream$ = timer(0, 1000).pipe(
    take(this.logs.length),
    map(i => this.logs[i])
  );


}
