import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { WebSocketAPI } from '@app/WebSocketAPI';



@Component({
    selector: 'home.component',
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    loading = false;
    str: string;
    test: Promise<any>;

    constructor(private userService: UserService, private webSocketAPI: WebSocketAPI) {
        this.webSocketAPI._connect();
    }

    ngOnInit() {
        // this.userService.getAllEmployees().subscribe(data => {
        //     console.log(data);
        //     const users: User[] = [];
        //     for (let i = 1; i <= 5; i++) {
        //         users.push(data);
        //     }
        //     this.dataSource = new MatTableDataSource(users);
        // });
    }
    onClickButtonEmployees($event) {
        // console.log("Employee button is clicked!", $event);
        // this.userService.getAllEmployees().subscribe(data => {
        //     console.log(data);
        //     this.dataSource.data.push(data);
        //     this.dataSource.filter = "";
        // });
        let u = new User();
        u.id = 1;
        u.firstName = 'First Name';
        u.lastName = 'Last Name';
        const users: User[] = [];
        for (let i = 1; i <= 5; i++) {
            users.push(u);
        }
        this.dataSource = new MatTableDataSource(users);
    }

    onClickButtonCustomers($event) {
        // console.log("Customer button is clicked!", $event);
        // this.userService.getAllCustomers().subscribe(data => {
        //     console.log(data);
        //     this.dataSource.data.push(data);
        //     this.dataSource.filter = "";
        // });
    }

    onClickButtonWebSocket($event) {
        this.webSocketAPI._subscribe('/topic/status');
    }


    displayedColumns: string[] = ['id', 'first_name', 'last_name'];
    dataSource: MatTableDataSource<User>;

}