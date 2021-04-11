import { Injectable } from '@angular/core';
import  "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private host:string = "http://localhost:8080";
  private jwtToken:any;
  private roles:Array<any>=[];
  localStorage: Storage;
  constructor(private http:HttpClient) {
    this.localStorage = window.localStorage;
  }

  login(user: any) {
    return this.http.post(this.host + "/login", user, { observe: 'response'});
  }

  register(user: any) {
    return this.http.post(this.host + "/register", user);
  }

  saveToken(jwtToken: any) {
    this.jwtToken=jwtToken;
    this.localStorage.setItem('token',jwtToken);
    let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    console.log(this.roles);
  }

  getTasks(){
    if(this.jwtToken==null) this.loadToken();
    let httpHeaders: HttpHeaders = new HttpHeaders({'Authorization': this.jwtToken});
    return this.http.get(this.host + "/tasks", {headers: httpHeaders});
  }

  saveTask(task: any) {
    let httpHeaders: HttpHeaders = new HttpHeaders({'Authorization': this.jwtToken});
    return this.http.post(this.host + "/tasks", task, {headers: httpHeaders});
    //return this.http.post(this.host + "/tasks", task, {headers: });
  }

  loadToken() {
    this.jwtToken = this.localStorage.getItem('token');
    return this.jwtToken;
  }

  logout() {
    this.jwtToken=null;
    this.localStorage.removeItem('token');
  }

   isAdmin() {
    for(let r of this.roles) {
      if(r.authority=='ADMIN') return true;
    }
    return false;
  }
}
