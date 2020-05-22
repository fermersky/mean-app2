import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'hts-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string;
  filterText: string;

  constructor(private users: UsersService, private title: Title) {}

  ngOnInit() {
    this.username = this.users.getUserFromLocalStorage().name;
    this.title.setTitle('HService: Profile of user ' + this.username);
  }

  onFilterFieldChanged(val: string) {
    this.filterText = val;
  }
}
