
import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { blogData } from './user.model'
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any;
  formvalue!: FormGroup;
  blogModelobj: blogData = new blogData;
  GetBlog: any;
  data: any;
  userName: any;
  showData: any;
  blogid:any;
  blogs: any;
  token:any;
  status:any;
  reloadPage() {
    location.reload();
  }

  constructor(private dis: UsersDataService, private form: FormBuilder,private jwtHelper:JwtHelperService) {
    this.token = localStorage.getItem('token');

    const decodedToken = this.jwtHelper.decodeToken(this.token);
    this.userName = decodedToken.sub;
    this.status = decodedToken.status;
    console.log(this.userName);

    this.loadBlogs();
  }
  ngOnInit(): void {


    this.formvalue = this.form.group({
      username: this.userName,
      title: [''],
      discription: [''],
      url: ['']

    })
  }
  loadBlogs() {
    this.dis.GetblogById(this.userName).subscribe((display) => {
      this.blogs = display;
      console.warn(display);
    });
    // console.log(this.userName)
  }

  onAddBlogHandler(){
  
    this.formvalue.controls['title'].setValue("")
    this.formvalue.controls['discription'].setValue("")
    this.formvalue.controls['url'].setValue("")
  }

  addblog() {
    // console.log(JSON.parse(this.userName).username);
    
    this.blogModelobj.title = this.formvalue.value.title;
    this.blogModelobj.discription = this.formvalue.value.discription;
    this.blogModelobj.url = this.formvalue.value.url;
    this.blogModelobj.username = this.userName;
    console.log(this.formvalue.value)
    this.dis.postblogs(this.formvalue.value).subscribe(res => {
      console.log(this.formvalue.value);
      this.data = res;
      this.reloadPage();
    })

  }
  delBlogs(data: any) {
    this.dis.deleteBlgs(data.id).subscribe(res => {
      console.log(res);
      alert("Data deleted");
      this.formvalue.reset();
      this.reloadPage();
    })
  }
  

  OnEditBlogs(data:any){
    this.blogid=data.id
    this.formvalue.controls['title'].setValue(data.title)
    this.formvalue.controls['discription'].setValue(data.discription)
    this.formvalue.controls['url'].setValue(data.url)
  }

  UpdateBlog(data:any){
    console.log("updated",data);
    
    
    
    // this.blogModelobj.title = this.formvalue.value.title;
    // this.blogModelobj.discription = this.formvalue.value.discription;
    // this.blogModelobj.url = this.formvalue.value.url;
    this.dis.updateblogs(data,this.blogid).subscribe(res=>{
      console.log(res);
      alert("record updated successfully")
      this.formvalue.reset();
      this.reloadPage();
    });
  }
}
