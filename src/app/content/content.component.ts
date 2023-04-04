import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  blogs: any;
  formvalue!: FormGroup;
  blogid: any;
  isTableVisible = false;
  isTable1Visible = false;
  
  constructor(private formbuilder:FormBuilder,private api:UsersDataService,private route:Router){
    api.blogs().subscribe((display)=>
    {
      // console.warn("display",display)
      console.log(display);
      this.blogs=display;
    }
    );
  }
  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
    Username:[''],
    title:[''],
    discription:[''],
    url:['']
    })
 }
 reloadPage() {
  location.reload();
}

 delBlogs(data: any) {
  this.api.deleteBlgs(data.id).subscribe(res => {
    console.log(res);
    alert("Data deleted");
    this.formvalue.reset();
    this.reloadPage();
  })
}

showTable() {
  this.isTableVisible = true;
  this.isTable1Visible=false;
  this.route.navigate(['/usertable']);
}

showTable1() {
  this.isTable1Visible = true;
  this.isTableVisible=false;
  this.route.navigate(['/content']);
  
}

OnEditBlogs(data:any){
 
  this.blogid=data.id
  console.log(data);
  this.formvalue.controls['Username'].setValue(data.Username);
  this.formvalue.controls['title'].setValue(data.title);
  this.formvalue.controls['discription'].setValue(data.discription);
  this.formvalue.controls['url'].setValue(data.url);
}

UpdateBlog(data:any){
console.log("updated",data);

// this.blogModelobj.title = this.formvalue.value.title;
// this.blogModelobj.discription = this.formvalue.value.discription;
// this.blogModelobj.url = this.formvalue.value.url;
this.api.updateblogs(data,this.blogid).subscribe(res=>{
  console.log(res);
  
  alert("record updated successfully")
  this.formvalue.reset();
  this.reloadPage();
});
}
}
