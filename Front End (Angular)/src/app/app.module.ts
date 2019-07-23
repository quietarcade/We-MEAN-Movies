import {BrowserModule}from '@angular/platform-browser';
import {NgModule}from '@angular/core';
import {RouterModule}from '@angular/router';
import {AppComponent}from './app.component';
import {MoviesComponent}from './movies.component';
import {WebService}from './web.service';
import {HttpModule}from '@angular/http';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import {HomeComponent}from './home.component';
import { MovieComponent} from './movie.component';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';
import { NavComponent } from './nav.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './profile.component';
import {NgxPaginationModule} from 'ngx-pagination';

var routes = [
	{
		path : '',
		component : HomeComponent,
		pathMatch: 'full',
		children: [
			{ path: 'home', component: HomeComponent }
		]
	}, 
	{
		path : 'movies',
		component : MoviesComponent
	}, 
	{
		path : 'movies/:id',
		component : MovieComponent
	},
	{
		path: 'callback',
		component: CallbackComponent
	},
	{
	path: 'profile', 
	component: ProfileComponent
	}
];

 @ NgModule({
	declarations : [
		AppComponent, MoviesComponent, HomeComponent, MovieComponent, ProfileComponent,
		CallbackComponent, NavComponent
	],
	imports : [
		BrowserModule, HttpModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, Ng2SearchPipeModule, NgxPaginationModule

	],
	providers : [WebService, AuthService],
	bootstrap : [AppComponent]
})
export class AppModule {}
