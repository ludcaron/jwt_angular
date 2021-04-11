import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  task: any;
  mode:number = 0;
  errorMessage: string = "";
  
  constructor(private authService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSaveTask(task: string) {
    this.authService.saveTask(task)
    .subscribe(resp=>{
      this.task=resp;
      this.router.navigateByUrl("/tasks");
    },err=>{
      console.log(err);
    })
  }

}
