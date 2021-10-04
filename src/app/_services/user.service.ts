import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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
    getAllUsers(): Observable<any> {
        return this.http.get<any>(`/api/users/all`);        
    }
    getLog(id:number): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            `/api/log/log/last/`+id, { observe: 'response' });
    }
}