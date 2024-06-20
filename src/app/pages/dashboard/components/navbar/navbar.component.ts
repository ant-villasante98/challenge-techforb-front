import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { UserDetails } from '../../../../models/user-details';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private userService = inject(UserService);
  userDetail: UserDetails = {
    email: "",
    firstName: "",
    id: 0,
    lastName: ""
  };

  ngOnInit(): void {
    this.userService.getDetails().subscribe({
      next: (data) => {
        this.userDetail = data
      }
    })
  }

}
