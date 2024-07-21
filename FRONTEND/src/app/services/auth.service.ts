import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users : UserModel[]= [
    {username :  "admin" , password : "123",roles : ['ADMIN', 'CREATE']},
    {username :  "cashier" , password : "123",roles : ['CASHIER','CREATE']},
    {username :  "accountant" , password : "123",roles : ['USER']},
  ];
  public loggedUser! :  string ;
  public isLoggedIn : Boolean = false;
  public roles! : string[];

  constructor(private router : Router) { 
 
  }
  
  SignIn(user : UserModel){
        let validUser  = false;
        this.users.forEach(u => {
              if(user.username==u.username && user.password==u.password)
                {
                  validUser=true;
                  this.loggedUser = u.username!
                  this.isLoggedIn= true;
                  this.roles = u.roles!;
                  localStorage.setItem('loggedUser',this.loggedUser);
                  localStorage.setItem('isLoggedIn',String(this.isLoggedIn));
                }  
        })
        return validUser; 
  }

  isCreate(){
    if(!this.roles){
      return false;
    }
    return (this.roles.indexOf('CREATE')>-1);
  }
  isAdmin(){
    if(!this.roles){
      return false;
    }
    return (this.roles.indexOf('ADMIN')>-1);
  }

  logout(){
    console.log("AuthService logout function called");

    this.loggedUser = undefined!;
    this.isLoggedIn = false;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLoggedIn');
     this.router.navigate(['login']);
  }

  setLoggedUserLS(login : string){
           this.loggedUser = login;
           this.isLoggedIn = true;
           this.getRoles(login);
     }

  getRoles(username : string ){
    this.users.forEach(u => {
      if (u.username == username){
        this.roles = u.roles!;
      }
    })
  }

}
