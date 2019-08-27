import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userIsAuthenticated = false;

  private authServiceSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authServiceSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }


  onLogout() {
    this.authService.logout();
  }
}
