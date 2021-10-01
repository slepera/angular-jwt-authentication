import { Component } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { WebSocketAPI } from '@app/WebSocketAPI';
import { HttpClient } from '@angular/common/http';



@Component({
    selector: 'home.component',
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    loading = false;
    str: string;
    test: Promise<any>;

    constructor(private userService: UserService) {
    }

    provaGet(){
        this.userService.getAllUsers().subscribe(         
                data => console.log(data)
        );
    }

    ngOnInit() {
    }


}