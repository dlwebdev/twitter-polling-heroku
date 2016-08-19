import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from "./routes";

import { AppComponent }  from './app.component';
import { AboutComponent } from "./components/about/about.component";
import { PollsComponent } from "./components/polls/polls.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { ManagePollComponent } from "./components/manage/manage.component";

import { PollService } from "./components/shared/services/polls.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        PollService
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        PollsComponent,
        AboutComponent,
        LoginComponent,
        ManagePollComponent,
        HomeComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
