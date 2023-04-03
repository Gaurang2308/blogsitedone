import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home'},
  {path:'login',component:LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'user', component:UserComponent},
  {path:'home',component:HomeComponent},
  {path:'content',component:ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
