import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { BagComponent } from './components/bag/bag.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';



const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch: 'full'},
  //{path: 'welcome', component: WelcomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup' , component:SignupComponent},
  {path: 'products' , component:ProductsComponent, canActivate: [AuthGuard]},
  {path: 'bag' , component:BagComponent , canActivate: [AuthGuard]},
  {path: 'single/:id', component:SinglePageComponent ,canActivate: [AuthGuard]},
  {path: 'admin' , component:AdminPanelComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
