import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContactsService } from '../../services/contacts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contactos',
  imports: [CommonModule,RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent{
  authService = inject(AuthService);
  contactsService = inject(ContactsService);

}
