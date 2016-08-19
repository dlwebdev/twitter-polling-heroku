import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from "@angular/http";

import { PollService } from "../shared/services/polls.service";

@Component({
    selector: 'my-polls',
    templateUrl: 'components/polls/polls.component.html',
    styleUrls: ['components/polls/polls.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class PollsComponent implements OnInit {
  newName: string = '';
  errorMessage: string = '';
  user: any = '';
  userId: any = '';

  polls: any[] = [];
  
  pollData = {
    name: '',
    creatorId: '',
    options: [
      {text: 'Option 1', val: 0},
      {text: 'Option 2', val: 0}
    ],
    dateAdded: ''
  };  
  
  constructor(private router: Router, private http: Http, private pollService: PollService) {
    this.resetPollData();
  } 
  
  ngOnInit() {
    // Check credentials. Will send to login screen if they are not logged in.
    
    this.http.get('/api/user/get-id-of-logged-in')
        .map(data => data.json())
        .subscribe(
            resp => {
                if((resp as any).user !== "-1") {
                    this.userId = resp.user; 
                    this.getUserPolls();
                }
                else {
                    this.router.navigate(['/login']);                    
                }
                //console.log("user id: ", this.userId);
            }
        );     
  }  
  
  addPollOption() {
    this.pollData.options.push({text: '', val: 0});
  } 
  
  deletePoll(id:number) {
    this.pollService.deletePoll(id)
      .subscribe(
        polls => this.polls = polls,
        error =>  this.errorMessage = <any>error
      );
  }  
  
  viewPoll(id:number) {
    this.router.navigate(['/manage', id]);
  }    
  
  createPoll() {
    this.pollData.creatorId = this.userId;

    this.pollService.postNewPoll(this.pollData)
      .subscribe(
        this.resetPollData();
        this.getUserPolls();
        error =>  this.errorMessage = <any>error;
      );
  }  
  
  resetPollData() {
    this.pollData = {
      name: '',
      creatorId: this.userId,
      options: [
        {text: 'Option 1', val: 0},
        {text: 'Option 2', val: 0}
      ],
      dateAdded: ''
    };     
  }  
  
  getUserPolls() {
    this.pollService.getUserPolls()
      .subscribe(
        polls => this.polls = polls,
        error =>  this.errorMessage = <any>error
      );
  }  
  
  logout() {
    this.http.get('/api/user/logout')
        .map(data => data.json())
        .subscribe(
            resp => {
                this.router.navigate(['/']);
            }
        );    
  }   
  
}