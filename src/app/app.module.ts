import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { MatTableModule } from '@angular/material/table';
import { RegisterComponent } from './register';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LogMonitorModule} from 'ngx-log-monitor';
import { LogComponent } from './log/log.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OperationComponent } from './operation/operation.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';;
import { SatelliteFormComponent } from './satellite-form/satellite-form.component';
import { GpsReceiverFormComponent } from './gps-receiver-form/gps-receiver-form.component'

@NgModule({
    imports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        MatTableModule,
        BrowserAnimationsModule,
        LogMonitorModule,
        NgxDatatableModule,
        MatSelectModule,
        MatTabsModule,
        ScrollingModule,
        FlexLayoutModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LogComponent
,
        OperationComponent,
        SatelliteFormComponent
,
        GpsReceiverFormComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }