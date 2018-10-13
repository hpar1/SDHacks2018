import { Component, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';

import { trigger,state,style,transition,animate,keyframes, group } from '@angular/animations';

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
  			'max-height': '0px',
  			'opacity': '0',
  			'visibility': 'hidden'
  		})),
  		state('left', style({
  			right: '0px',
  			left: '1000px'
  		})),
  		transition('center => right', [animate('2s ease-in'
  			, style({transform: 'translateX(-100%'}))]),
        transition('center => left', animate('2s cubic-bezier(1,2,3,4)'))
  		])
  ]
})

export class AppComponent {
  acc: string;
  title = 'frontend';
  quota = 0;
  temp: User;
	//uniqueID, name
  accepted: User[] = [];
  rejected: User[] = [];
  viewed: User[] = [];

  users: User[] = [{"GPA": 3.6,
	  	"gradYear": 1997,
	  	"ResumeLink": 'https://images.unsplash.com/photo-1481930703900-9007d48152b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=affcda687d4c6140a87cc4fb6c86df05&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'
	  	, "name": 'm'},
	  	{"GPA": 2.4,
	    "gradYear": 1987,
	    "ResumeLink": 'https://images.unsplash.com/photo-1481391145929-5bcf567d5211?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9fcb3e65f18d1da71faf0ac2013391b&w=1000&q=80'
	  	, "name": 'n'},
	  	{"GPA": 1.5,
	    "gradYear": 2007,
	    "ResumeLink": 'https://images.unsplash.com/photo-1453834190665-46ff0a1fbd5a?ixlib=rb-0.3.5&s=583ec45454c1e8c01473210feba60ad3&w=1000&q=80'
	  	, "name": 'a'},
	  	{"GPA": 6.8,
	    "gradYear": 2091,
	    "ResumeLink": 'https://images.unsplash.com/photo-1480480213546-c79a7c9f0904?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd37190b52c1780bd316adeae57bcbcb&w=1000&q=80'
	  	, "name": 't'},
	  	{"GPA": 3.4,
	    "gradYear": 1375,
	    "ResumeLink": 'https://images.unsplash.com/photo-1483333312588-7f53835a19dd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98d1880f74bbaa86bf1506aba56a63dc&w=1000&q=80'
	  	, "name": 'aw'},
	  	{"GPA": .8,
	    "gradYear": 1776,
	    "ResumeLink": 'https://images.unsplash.com/photo-1481834752827-ff7693aced74?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a68288e696f3e004ef9e40bd7ccbbc24&w=1000&q=80'
	  	, "name": 'w'}
		];

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.getUsers();
  }

  getUsers(): void {
  	this.userService.getUsers().subscribe(users => this.users = users);
  }

  @HostListener('document:keypress', ['$event'])
  resumeJudge(event: KeyboardEvent) {
  	for (let i = 0; i < this.users.length; i++) {
  		if (!this.viewed.find(user => user.name == this.users[i].name)) {
  			this.viewed.push(this.users[i]);
		  	if (event.code == "ArrowLeft") {
		  		this.rejectResume(i);
		  	} else if (event.code == "ArrowRight") {
		  		this.acceptResume(i);
		  	}
		  }
  	}
  }

  acceptResume(im: number) {
  	console.log("Right");
  	this.acc = 'right';
  	this.accepted.push(this.users[im]);
  	this.quota++;
  }

  rejectResume(im: number) {
  	console.log("Left");
  	this.acc = 'left';
  	this.rejected.push(this.users[im]);
  }
}
