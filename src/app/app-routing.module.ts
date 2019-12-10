import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {InPlayComponent} from './in-play/in-play.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {StandingsComponent} from './standings/standings.component';
import {ResultsComponent} from './results/results.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthGuard} from './_helpers/auth.guard';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  /*
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clients',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'systems',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'vendors',
        loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'companies',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'permissions',
        loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'taxes',
        loadChildren: () => import('./tax/tax.module').then(m => m.TaxModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'logs',
        loadChildren: () => import('./log/log.module').then(m => m.LogModule),
        canActivate: [AuthGuard, PermissionGuard]
      }
    ]
  },*/

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'in-play',
    component: InPlayComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'results',
    canActivate: [AuthGuard],
    component: ResultsComponent
  },
  {
    path: 'championsLeague/:leagueId',
    component: StandingsComponent
  },
  {
    path: 'europaLeague/:leagueId',
    component: StandingsComponent
  },
  {
    path: '**',
    component: ErrorNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
