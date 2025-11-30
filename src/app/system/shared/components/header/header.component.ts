import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../feature/security/services/authservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentUser: any = null;

  constructor(public authService: AuthserviceService) {
  }

  ngOnInit(): void {
    // Assinar o BehaviorSubject para atualizações em tempo real
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  // get userName(): string {
  //   const user = this.authService.getCurrentUser();
  //   return user ? user.name : '';
  // }

  get isAuthenticated(): boolean {
    return !!this.currentUser; // true se estiver logado
  }
}
