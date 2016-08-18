import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from "@angular/http";

@Component({
  selector: 'my-navbar',
  templateUrl: 'components/shared/navbar/navbar.component.html',
  styleUrls: ['components/shared/navbar/navbar.component.css'],  
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
    user: any = '';
    userLoggedIn: boolean = false;
    errorMessage: string;

    constructor(private http: Http) { }	

    ngOnInit() {
        this.setLoggedInStatus(); 
    }

    setLoggedInStatus() {
        this.http.get('/api/user/authenticated')
            .map(data => data.json())
            .subscribe(
                resp => {
                    //console.log('Authentication response: ', resp);
                    if((resp as any).authenticated) {
                        this.userLoggedIn = true;    
                    }
                }
            );     
    } 	
}