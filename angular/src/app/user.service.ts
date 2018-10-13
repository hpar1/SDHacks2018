import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './User';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  databaseURL = 'http://localhost:8080/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
  	return this.http.get<User[]>(this.databaseURL)
  		.pipe(tap(users => this.log('fetched users')),
  			catchError(this.handleError<User[]>('getUsers', [])));
  }


  private log(message: string) {
  	this.messageService.add('HeroService: ${message}');
  }

	/**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	 
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	 
	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}