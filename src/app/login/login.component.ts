import { LoginserviceService } from './loginservice.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersDataService } from '../services/users-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup
  status:any
  user:any;
  showData:any;
  users: any;
  token:any;
  Credentials: any;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router,private dis:UsersDataService 
    , private jwtHelper: JwtHelperService,private Loginservice:LoginserviceService) {
    // this.GetDetails();
   }
  //  GetDetails() {
  //   this.dis.users().subscribe((result) => {
  //     this.showData = result;
  //     console.log(this.showData);
  //   }
  //   )
  // }
  ngOnInit(): void {
    this.loginform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
      })
  }
  logIn() {
    this.Loginservice.doLogin(this.loginform.value).subscribe((data:any)=>{
      console.log(data.token);
      this.Loginservice.loginuser(data.token);
      this.token = localStorage.getItem('token');
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      
      this.status = decodedToken.status;
      if(this.status === "admin"){
         alert("login successfully");
         this.loginform.reset();
         this.router.navigate(['admin'])
       }else if(this.status === "user"){
         alert("login user successfully");
         this.loginform.reset();
         this.router.navigate(['user']);
       }
      
      }
    )
  //   this._http.get<any>("http://localhost:8080/api/v1/employees").subscribe(res=>{
  //      this.user= res.find((a:any)=>{
  //        return a.username === this.loginform.value.username && a.password === this.loginform.value.password  
  //       })
        
  //       if(this.user.status === "admin"){
  //      sessionStorage.setItem('user',JSON.stringify(this.user));
  //       alert("login successfully");
  //       this.loginform.reset();
  //       this.router.navigate(['admin'])
  //     }else if(this.user.status === "user"){
        
  //       sessionStorage.setItem('username',this.user.username);
  //       sessionStorage.setItem('user',JSON.stringify(this.user));
  //       alert("login user successfully");
  //       this.loginform.reset();
  //       this.router.navigate(['user']);
  //     }
  //     else if(this.loginform.value.username!== this.user.username && this.loginform.value.password!== this.user.password){
  //       console.log("invalid credential");
  //     }
  //     else{
  //       alert("user not found");
  //     }
  //   },err=>{
  //    alert("server side error");
  //   })
  // }
}
}
  