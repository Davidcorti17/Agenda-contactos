import { Component, computed, inject, input, resource, signal } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  imports: [CommonModule,NgOptimizedImage,RouterModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {

  contactsService = inject(ContactsService);

  id = input.required<string>();
  contact = computed(()=> this.contactsService.contacts.value()?.find(contact => contact.id == this.id()));

}
