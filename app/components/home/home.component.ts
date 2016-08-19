import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from "@angular/http";

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    name: string = "Home";
    users: {};
    
    errorMessage: string;
    polls: any[] = []; 
    userLoggedIn: boolean = false;

    constructor(
        private http: Http,
        private router: Router
    ) { }
    
    ngOnInit() {
        this.getAllPolls();
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
    
    showPollDetail(id: string) {
        //console.log('Will send to poll detail with poll of: ', id);
        this.router.navigate(['/poll-detail', id]);    
    }    
    
    getAllPolls() {
        this.http.get('/api/polls')
            .map((res: Response) => res.json())
            .subscribe(
                resp => {
                    this.polls = resp;
                    
                    for (let poll of this.polls) {            
                      let pollTotalVotes = 0;
        
                      for (let option of (poll as any).options) {
                        pollTotalVotes += option.val;
                      }      
        
                      (poll as any).totalVotes = pollTotalVotes;
                    }                    
                }
            );   
    }     
}