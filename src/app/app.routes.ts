import { Routes } from '@angular/router';
import { onlyGuestGuard } from './guards/only-guest.guard';
import { onlyUserGuard } from './guards/only-user.guard';

export const routes: Routes = [{
  path: "login",
  loadComponent: ()=> import("./pages/login/login.component").then(c => c.LoginComponent),
  canActivate: [onlyGuestGuard],
  title: "Agenda de contactos | Iniciar sesión"
},
{
  path: "register",
  loadComponent: ()=> import("./pages/register/register.component").then(c => c.RegisterComponent),
  canActivate: [onlyGuestGuard],
  title: "Agenda de contactos | Registarse"
},
{
  path: "contacts",
  loadComponent: ()=> import("./pages/contacts/contacts.component").then(c => c.ContactsComponent),
  canActivate: [onlyUserGuard],
  title: "Agenda de contactos"
},
{
  path: "contacts/new",
  loadComponent: ()=> import("./pages/contact-new-edit/contact-new-edit.component").then(c => c.ContactNewEditComponent),
  canActivate: [onlyUserGuard],
  title: "Agenda de contactos | Agregar contacto"
},
{
  path: "contacts/:id",
  loadComponent: ()=> import("./pages/contact-info/contact-info.component").then(c => c.ContactInfoComponent),
  canActivate: [onlyUserGuard],
  title: "Agenda de contactos"
},
{
  path: "contacts/:id/edit",
  loadComponent: ()=> import("./pages/contact-new-edit/contact-new-edit.component").then(c => c.ContactNewEditComponent),
  canActivate: [onlyUserGuard],
  title: "Agenda de contactos | Editar contacto"
},
{
  path: "",
  redirectTo: "login",
  pathMatch: "full"
}
];
