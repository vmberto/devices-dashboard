import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import {
  RootComponent,
  LoginComponent,
  DashboardComponent,
  ClientsListComponent,
  ClientsCreateComponent,
  ClientsShowComponent,
  ClientsIndexComponent
} from './components';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', canActivate: [AuthGuardService], component: RootComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent, data: { title: 'painel' } },


      {
        path: 'clients', component: ClientsIndexComponent, data: { title: 'clientes' }, children: [
          { path: '', component: ClientsListComponent },
          { path: 'create', component: ClientsCreateComponent },
          { path: 'show/:id', component: ClientsShowComponent },
        ]
      },

    ]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
