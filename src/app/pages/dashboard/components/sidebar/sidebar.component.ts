import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthManagerService } from '../../../../shared/services/auth-manager.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private router = inject(Router);
  private authManager = inject(AuthManagerService);

  logout() {
    this.authManager.rmCreadentials();
    this.router.navigateByUrl("/auth/login");
  }
}
