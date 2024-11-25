import { Component, computed, inject, input } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-new-edit',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatInputModule],
  templateUrl: './contact-new-edit.component.html',
  styleUrl: './contact-new-edit.component.scss'
})
export class ContactNewEditComponent {
  contactsService = inject(ContactsService);

    id = input<string>();
    contact = computed(()=> {
      if(!this.id()) return null;
      return this.contactsService.contacts.value()?.find(contact => contact.id == this.id())
    });

    save(){
      console.log("Guardando contacto");
    }
}
