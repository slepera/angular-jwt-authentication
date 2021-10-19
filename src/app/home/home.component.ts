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
    constructor(private userService: UserService) {
        
    }

    provaGet(){
    }

    stopProva(){
    }

    

    ngOnInit() {
    }


}