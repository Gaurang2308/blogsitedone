import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { UsertableComponent } from './usertable/usertable.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home'},
  {path:'login',component:LoginComponent},
  {path:'user', component:UserComponent,canActivate:[AuthGuard]},
  {path:'admin', component:AdminComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'content',component:ContentComponent,canActivate:[AuthGuard]},
  {path:'usertable',component:UsertableComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
