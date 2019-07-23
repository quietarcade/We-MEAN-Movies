import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public auth: AuthService) {
        auth.handleAuthentication();
      }
    
      ngOnInit() {
        if (this.auth.isAuthenticated()) {
          this.auth.renewTokens();
        }
      } 
    searchText;
    movie = [];
}