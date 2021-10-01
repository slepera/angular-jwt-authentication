import { Component } from '@angular/core';
import { first, map, subscribeOn } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { WebSocketAPI } from '@app/WebSocketAPI';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';



@Component({
    selector: 'home.component',
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    loading = false;
    str: string;
    test: Promise<any>;
    log: any;
    stopLog = false;
    constructor(private userService: UserService) {
        
    }

    provaGet(){
        this.stopLog=false;
        let subscription;
        let idLog = 55;
        setInterval( () => {
            if( this.stopLog == false){
                subscription = this.userService.getLog(idLog).subscribe(
                    log => console.log(log)
                );
            }else{
                subscription.unsubscribe();
                return;
            }
         }, 2000);
        // this.userService.getAllUsers().subscribe(         
        //         data => console.log(data)
        // );
    }

    stopProva(){
        this.stopLog=true;
    }

    

    ngOnInit() {
    }


}