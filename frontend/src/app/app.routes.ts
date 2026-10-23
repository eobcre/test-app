import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { Home } from './router-outlet/home/home';
import { Users } from './router-outlet/users/users';
import { Counter } from './router-outlet/counter/counter';
import { ApiPage } from './router-outlet/api-page/api-page';
import { DbSearch } from './router-outlet/db-search/db-search';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'counter',
    component: Counter,
  },
  {
    path: 'api-page',
    component: ApiPage,
  },
  {
    path: 'db-search',
    component: DbSearch,
  },
];
