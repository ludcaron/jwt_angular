import { Component } from '@angular/core';
import { AuthentificationService} from "./services/authentification.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyTaskWebApp';
  constructor(private authService:AuthentificationService, private router:Router){}

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
