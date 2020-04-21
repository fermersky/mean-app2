import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'hts-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.username = this.users.getUserFromLocalStorage().name;
  }
}
