import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { onlyGuestGuard } from './guards/only-guest.guard';
import { onlyUserGuard } from './guards/only-user.guard';

export const routes: Routes = [{
  path: "login",
  loadComponent: ()=> import("./pages/login/login.component").then(c => c.LoginComponent),
  canActivate: [onlyGuestGuard]
},
{
  path: "register",
  loadComponent: ()=> import("./pages/register/register.component").then(c => c.RegisterComponent),
  canActivate: [onlyGuestGuard]
},
{
  path: "contacts",
  loadComponent: ()=> import("./pages/contacts/contacts.component").then(c => c.ContactsComponent),
  canActivate: [onlyUserGuard]
},
{
  path: "",
  redirectTo: "login",
  pathMatch: "full"
}
];
