import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
        }
    });
  }
  ngOnInit(): void {
  }
  
  
}
