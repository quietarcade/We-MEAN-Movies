import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
 selector: 'navigation',
 templateUrl: './nav.component.html',
 styleUrls: []
})
export class NavComponent { 

    userImage: string;

    constructor(private auth: AuthService) {}
  
    ngOnInit() {
      this.auth.userImageChange$.subscribe(image => this.userImage = image);
    }

}