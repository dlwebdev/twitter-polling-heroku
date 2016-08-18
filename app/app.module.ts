import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from "./routes";

import { AppComponent }  from './app.component';
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        AboutComponent,
        LoginComponent,
        HomeComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
