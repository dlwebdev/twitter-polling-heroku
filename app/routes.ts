import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { PollsComponent } from './components/polls/polls.component';
import { PollDetailComponent } from './components/poll-detail/poll.component';
import { ManagePollComponent } from "./components/manage/manage.component";

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'polls', component: PollsComponent },
    { path: 'poll-detail/:id', component: PollDetailComponent },
    { path: 'manage', component: ManagePollComponent },
    { path: 'manage/:id', component: ManagePollComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
