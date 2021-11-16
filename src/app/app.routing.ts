import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LogComponent } from './log/log.component';
import { LoginComponent } from './login';
import { OperationComponent } from './operation/operation.component';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'log', component: LogComponent, canActivate: [AuthGuard]},
    { path: 'operation', component: OperationComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);