import { Component, Input, HostListener } from '@angular/core';

import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resume-swiper',
  templateUrl: './resume-swiper.component.html',
  styleUrls: ['./resume-swiper.component.css']
})

export class ResumeSwiperComponent {
  @Input() selectedUser: User;

  acc: string;
  title = 'Resume grader';
  quota = 10;
  judged = 0;
  totalJudged = 0;

  //uniqueID, name
  accepted: User[] = [];
  rejected: User[] = [];
  viewed: User[] = [];

  users: User[] = [{"GPA": 3.6,
	  	"gradYear": 1997,
	  	"ResumeLink": 'https://images.unsplash.com/photo-1481930703900-9007d48152b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=affcda687d4c6140a87cc4fb6c86df05&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'
	  	, "name": 'm'
      , "status": "Undecided"},
	  	{"GPA": 2.4,
	    "gradYear": 1987,
	    "ResumeLink": 'https://images.unsplash.com/photo-1481391145929-5bcf567d5211?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9fcb3e65f18d1da71faf0ac2013391b&w=1000&q=80'
	  	, "name": 'n'
      ,"status": "Undecided"},
	  	{"GPA": 1.5,
	    "gradYear": 2007,
	    "ResumeLink": 'https://images.unsplash.com/photo-1453834190665-46ff0a1fbd5a?ixlib=rb-0.3.5&s=583ec45454c1e8c01473210feba60ad3&w=1000&q=80'
	  	, "name": 'a'
      ,"status": "Undecided"},
	  	{"GPA": 6.8,
	    "gradYear": 2091,
	    "ResumeLink": 'https://images.unsplash.com/photo-1480480213546-c79a7c9f0904?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd37190b52c1780bd316adeae57bcbcb&w=1000&q=80'
	  	, "name": 't'
      ,"status": "Undecided"},
	  	{"GPA": 3.4,
	    "gradYear": 1375,
	    "ResumeLink": 'https://images.unsplash.com/photo-1483333312588-7f53835a19dd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98d1880f74bbaa86bf1506aba56a63dc&w=1000&q=80'
	  	, "name": 'aw'
      ,"status": "Undecided"},
	  	{"GPA": .8,
	    "gradYear": 1776,
	    "ResumeLink": 'https://images.unsplash.com/photo-1481834752827-ff7693aced74?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a68288e696f3e004ef9e40bd7ccbbc24&w=1000&q=80'
	  	, "name": 'w'
      ,"status": "Undecided"}
		];

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.getUsers();
  	this.selectedUser = this.users[0];
  }

  getUsers(): void {
  	this.userService.getUsers().subscribe(users => this.users = users);
  }

  postUsers(): void {
  	console.log("DebugPost");
  	var response;
  	this.userService.postUsers(this.users).subscribe(res => response = res);
  	console.log(response);
  }

  goBack(): void{
  	console.log("DebugBack");
  	var response;
  	this.userService.returnToMenu(this.users).subscribe(res => response = res);
  	console.log(response);
  }

  undo(): void {
  	this.totalJudged--;
  	if (this.judged > 0) {
  		this.judged--;
  	}
  	let undone = this.viewed.pop();
  	if (this.accepted.find(user => user.name == undone.name)) {
  		this.accepted.pop();
  	} else {
  		this.rejected.pop();
  	}
  	this.selectedUser = undone;
    this.selectedUser.status = "Undecided";
  }

  isInvalid(): boolean {
  	return this.totalJudged == 0;
  }

  @HostListener('document:keypress', ['$event'])
  resumeJudge(event: KeyboardEvent) {
  	var code = event.code;
  	if (code == "ArrowLeft" || code == "ArrowRight") {
  	  if (this.totalJudged < this.users.length) {
	    if (!this.viewed.find(user => user.name == this.selectedUser.name)) {
		  this.viewed.push(this.selectedUser);
	  	if (code == "ArrowLeft") {
	  	  this.rejectResume();
	  	} else if (code == "ArrowRight") {
	  	  this.acceptResume();
	  	}
	  }
	  this.selectedUser = this.users[this.totalJudged];
	  }
	}
  }

  acceptResume() {
  	this.acc = 'right';
  	this.accepted.push(this.selectedUser);
    this.selectedUser.status = "Accepted";
  	this.judged++;
  	this.totalJudged++;
  }

  rejectResume() {
  	this.acc = 'left';
  	this.rejected.push(this.selectedUser);
    this.selectedUser.status = "Rejected";
  	this.totalJudged++;
  }
}
