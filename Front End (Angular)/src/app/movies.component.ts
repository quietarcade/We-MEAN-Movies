import {Component, OnInit}
from '@angular/core';
import {WebService} from './web.service';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ChangeDetectionStrategy, Input} from "@angular/core";

@ Component({
	selector: 'movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
   
})
export class MoviesComponent  {
	constructor(private webService: WebService, private http: Http, private auth: AuthService) {}

ngOnInit() {
	
      this.webService.getMovies();
      
	}

	movie_list;

	p: number = 1;

}
