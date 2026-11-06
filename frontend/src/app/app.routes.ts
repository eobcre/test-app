import { Routes } from '@angular/router';

import { Home } from './router-outlet/home/home';
import { Users } from './router-outlet/users/users';
import { Counter } from './router-outlet/counter/counter';
import { ApiPage } from './router-outlet/api-page/api-page';
import { DbSearch } from './router-outlet/db-search/db-search';

import { Login } from './router-outlet/login/login';

import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: Users,
    canActivate: [authGuard],
  },
  {
    path: 'counter',
    component: Counter,
    canActivate: [authGuard],
  },
  {
    path: 'api-page',
    component: ApiPage,
    canActivate: [authGuard],
  },
  {
    path: 'db-search',
    component: DbSearch,
    canActivate: [authGuard],
  },
];
