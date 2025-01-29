import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContactsService } from '../../services/contacts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupsService } from '../../services/groups.service';
import { ContactSummaryComponent } from "../../components/contact-summary/contact-summary.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contactos',
  imports: [CommonModule, RouterModule, ContactSummaryComponent,MatButtonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent{
  authService = inject(AuthService);
  contactsService = inject(ContactsService);
  groupsService = inject(GroupsService);

  async exportContacts(){
    this.contactsService.export();
  }
  
}
