import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mode=0;

  constructor(private authService:AuthentificationService,
              private router:Router) { }

  ngOnInit(){
    let token=this.authService.loadToken();
    if(token)
    this.router.navigateByUrl("/tasks");
  }

  onLogin(formData: any) {
    this.authService.login(formData).subscribe(resp=>{
      let jwtToken:any = resp.headers.get('authorization');
      this.authService.saveToken(jwtToken);
      this.router.navigateByUrl("/tasks");
    }, err=>{
      this.mode=1;
    })
  }

  onRegister() {
    this.router.navigateByUrl("/register");
  }

}
