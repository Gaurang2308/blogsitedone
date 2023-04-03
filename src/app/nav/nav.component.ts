import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
sessionData:any;
  
  constructor(private route:Router,private api:UsersDataService){
    this.logged();
  }
ngOnInit(): void {
  if (sessionStorage.getItem('user')!=null){
    this.sessionData = JSON.parse(sessionStorage.getItem('user')||'');
  }
}

logged(){
  this.ngOnInit();
  if(sessionStorage.getItem('user')!=null){
    return true;
  } 
  else{
    return false;
  }
} 

sessionlogout(){
  this.ngOnInit();
  sessionStorage.clear();
}

  loginpage(){
    this.route.navigate(['login']);
  }
  
}
