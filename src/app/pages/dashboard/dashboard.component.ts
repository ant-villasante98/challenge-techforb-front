import { NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgClass, SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  showSidevar = signal<boolean>(false);
  title = signal<string>("");

  ngOnInit(): void {
    this.title.set(this.route.snapshot.children[0].data["title"] ?? "hola");

    this.router.events.subscribe({
      next: data => {
        // if (data instanceof ActivationStart) {
        //   console.log(data.snapshot.data);
        // }
        this.title.set(this.route.snapshot.children[0].data["title"] ?? "hola");
      }
    });
  }

}
