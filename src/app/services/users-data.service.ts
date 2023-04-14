import { blogData } from './../user/user.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  user= "http://localhost:8080/api/v1/employees?status=user"
  constructor(private http:HttpClient) { }
  users()
  {
    return this.http.get(this.user);
  }
  postusers(data:any){
    return this.http.post<any>("http://localhost:8080/api/v1/employees",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getusers(){
    return this.http.get<any>("http://localhost:8080/api/v1/employees").pipe(map((res:any)=>{
      return res;
    })) 
  }
  deleteusers(id:number){
    return this.http.delete<any>("http://localhost:8080/api/v1/employees"+"/"+id).pipe(map((res:any)=>{
      return res;
    })) 
  }
  blog="http://localhost:8080/api/v1/Blogs"
  blogs()
  {
    return this.http.get(this.blog);
  }
  postblogs(data:any){
    return this.http.post<any>("http://localhost:8080/api/v1/Blogs",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getblogs(){
    return this.http.get<any>("http://localhost:8080/api/v1/Blogs").pipe(map((res:any)=>{
      return res;
    })) 
  }
  deleteblogs(id:number){
    return this.http.delete<any>("http://localhost:8080/api/v1/Blogs"+"/"+id).pipe(map((res:any)=>{
      return res;
    })) 
  }
  GetblogById(id:any){
    return this.http.get('http://localhost:8080/api/v1/Blogs/?Username='+`${id}`);
  }
  deleteBlgs(id:number){
    return this.http.delete<any>("http://localhost:8080/api/v1/Blogs/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  updateblogs(blogData:any,id:any){

    return this.http.put<any>(`http://localhost:8080/api/v1/Blogs/${id}`,blogData).pipe(map((res:any)=>{
      return res;
    }))
    // return this.http.put<any>(this.blog+"/"+blogData,id);
  }
  isLoginUser() {
    if (sessionStorage.getItem('user') != null) {
      return true;
    }
    else {
      return false;
    }
  }
  isRoleAdmin() {
    const sessionData = JSON.parse(sessionStorage.getItem('user') || '');
    if (sessionData[0].role === 'admin') {

      return true;
    }
    else {
      return false;
    }
  }
}
