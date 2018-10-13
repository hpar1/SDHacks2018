import { Component, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';

import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent, 
   Direction} from 'angular2-swing';

import { User } from './User';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  	trigger('Accepted', [
  		state('centered', style({
  			right: '0px',
  			left: '0px'
  		})),
  		state('right', style({
  			right: '1000px',
  			left: '0px'
  		})),
  		state('left', style({
  			right: '0px',
  			left: '1000px'
  		})),
  		transition('center => right', animate('100ms ease-out')),
        transition('center => left', animate('100ms ease-out'))
  		])
  ]
})

export class AppComponent {
  acc: string;
  title = 'frontend';
  quota = 0;

  users: User[] = [{"GPA": 3.6,
	  	"gradYear": 1997,
	  	"resume": 'https://images.unsplash.com/photo-1481930703900-9007d48152b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=affcda687d4c6140a87cc4fb6c86df05&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'
	  	, "isAccepted": true
	  	, "hasViewed": false},
	  	{"GPA": 2.4,
	    "gradYear": 1987,
	    "resume": 'https://images.unsplash.com/photo-1481391145929-5bcf567d5211?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9fcb3e65f18d1da71faf0ac2013391b&w=1000&q=80'
	  	, "isAccepted": true
	  	, "hasViewed": false},
	  	{"GPA": 1.5,
	    "gradYear": 2007,
	    "resume": 'https://images.unsplash.com/photo-1453834190665-46ff0a1fbd5a?ixlib=rb-0.3.5&s=583ec45454c1e8c01473210feba60ad3&w=1000&q=80'
	  	, "isAccepted": true
	  	, "hasViewed": false},
	  	{"GPA": 6.8,
	    "gradYear": 2091,
	    "resume": 'https://images.unsplash.com/photo-1480480213546-c79a7c9f0904?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd37190b52c1780bd316adeae57bcbcb&w=1000&q=80'
	  	, "isAccepted": true
	  	, "hasViewed": false},
	  	{"GPA": 3.4,
	    "gradYear": 1375,
	    "resume": 'https://images.unsplash.com/photo-1483333312588-7f53835a19dd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98d1880f74bbaa86bf1506aba56a63dc&w=1000&q=80'
	  	, "isAccepted": true
	  	, "hasViewed": false},
	  	{"GPA": .8,
	    "gradYear": 1776,
	    "resume": 'https://images.unsplash.com/photo-1481834752827-ff7693aced74?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a68288e696f3e004ef9e40bd7ccbbc24&w=1000&q=80'
	  	, "isAccepted": true
	  	, "hasViewed": false}
		]

  constructor(private userService: UserService) {}

/*
  ngOnInit() {
  	this.getUsers();
  }

  getUsers(): void {
  	this.userService.getUsers().subscribe(users => this.users = users);
  }
*/
  @HostListener('document:keypress', ['$event'])
  resumeJudge(event: KeyboardEvent) {
  	for (let i = 0; i < this.users.length; i++) {
  		if (!this.users[i].hasViewed) {
		  	if (event.code == "ArrowLeft") {
		  		this.acc = 'right';
		  		this.rejectResume(i);
		  	} else if (event.code == "ArrowRight") {
		  		this.acc = 'left';
		  		this.acceptResume(i);
		  	}
		  }
  	}
  }

  acceptResume(im: number) {
  	this.users[im].hasViewed = true;
  	this.quota++;
  }

  rejectResume(im: number) {
  	this.users[im].isAccepted = false;
  	this.users[im].hasViewed = true;
  }
}
