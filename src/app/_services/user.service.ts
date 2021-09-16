﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private auth: AuthenticationService, private http: HttpClient) { }

    getAllEmployees(): Observable<any> {
        return this.http.get<any>('/ccs/api/employee/get-all-employees');
    }

    getAllCustomers(): Observable<any> {
        return this.http.get<any>('/ccs/api/customer/get-all-customers');
    }

}