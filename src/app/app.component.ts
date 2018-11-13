import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { UpdateComponent } from './update/update.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
constructor(private route: ActivatedRoute, private router: Router) { 
     this.router.navigate(['login']);
  }
}
