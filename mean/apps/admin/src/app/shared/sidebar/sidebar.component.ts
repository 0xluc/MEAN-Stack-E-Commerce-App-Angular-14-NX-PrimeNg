import { Component } from '@angular/core';
import { AuthService } from '@mean/users';
@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout(){
    this.authService.logout()
  }
}
