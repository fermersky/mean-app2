import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'hts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {}

  logout() {
    this.auth.signOut();
    this.router.navigate(['home']);
  }
}
