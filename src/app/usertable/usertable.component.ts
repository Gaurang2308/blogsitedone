
import { Router } from '@angular/router';
import { usersData } from './usertable.model'
import { FormGroup,FormBuilder} from '@angular/forms';
import { UsersDataService } from './../services/users-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent {
  formvalue!: FormGroup
  editform!:FormGroup;
  user:any
  allusersData:any
  users:any
  blogid:any;
  isTableVisible = false;
  isTable1Visible = false;
  usersModalObj : usersData = new usersData;
  blogs: any;
display: any;
data: any;
  allusersstatus: any;
reloadPage() {
  location.reload();
}
  constructor(private formbuilder:FormBuilder,private api:UsersDataService,private route : Router){
    // api.blogs().subscribe((display)=>
    // {
    //   // console.warn("display",display)
    //   console.log(display);
    //   this.blogs=display;
    // }
    // );
    api.users().subscribe((data)=>{
    console.warn("data",data);
    this.allusersData=data;
    let user=this.allusersData.filter((t: { status: string; })=>t.status === "user");
    this.allusersstatus=user;
    console.log("user",user);
    
  });
  }
  ngOnInit(): void {
     this.formvalue=this.formbuilder.group({
      name:[''],
      username:[''],
      password:[''],
      status:[''] 
      })
  }
 
  addusers(){
    this.usersModalObj.name = this.formvalue.value.name;
    this.usersModalObj.username = this.formvalue.value.username;
    this.usersModalObj.password = this.formvalue.value.password;
    this.usersModalObj.status = this.formvalue.value.status;
    this.usersModalObj.blog = this.formvalue.value.blog

    this.api.postusers(this.usersModalObj).subscribe(res=>{
      console.log(res);
      alert("user record added successfully")
      this.formvalue.reset()
      this.getallData();
     // sessionStorage.setItem('userdata',JSON.stringify(this.allusersData));
      
    })
  }
  getallData(){
    this.api.getusers().subscribe(res=>{
      this.allusersData = res;
    })
  }
  deleteuser(data:any){
    this.api.deleteusers(data.id).subscribe(res=>{
      alert("record delete successfully")
      this.getallData();
    })
  }
  
    showTable() {
      this.route.navigate(['/usertable']);
      this.isTableVisible = true;
      // this.isTable1Visible=false;
    }

    showTable1() {
      this.isTable1Visible = true;
      this.isTableVisible=false;
      this.route.navigate(['/content']);
      
    }
    
  

}
