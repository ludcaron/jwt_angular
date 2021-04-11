import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user:any;
  mode:number = 0;
  errorMessage: string = "";
  
  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  onRegister(user:any) {
    this.authService.register(user).subscribe(
      data=>{
        this.user = data;
        this.mode = 1;
      },
      err=>{
        this.errorMessage = err.errorMessage;
        this.mode=0;
      }
    )
  }


}
