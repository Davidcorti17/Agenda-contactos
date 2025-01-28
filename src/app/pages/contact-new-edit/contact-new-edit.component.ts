import { Component, computed, effect, inject, input } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Contact, ContactNew, CONTACTO_NUEVO_VACIO, CONTACTO_VACIO } from '../../interfaces/contact';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-contact-new-edit',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatInputModule],
  templateUrl: './contact-new-edit.component.html',
  styleUrl: './contact-new-edit.component.scss'
})
export class ContactNewEditComponent {
  contactsService = inject(ContactsService);
  router = inject(Router);
  snackBarService = inject(SnackBarService)


  id = input<number>();
  contact = computed(()=> {
    if(!this.id()) return undefined;
    return this.contactsService.contacts.value()?.find(contact => contact.id == this.id())
  });
  precompletarFormulario = effect(()=> {
    if(this.contact()){
      this.form.controls.firstName.setValue(this.contact()!.firstName || '');
      this.form.controls.lastName.setValue(this.contact()!.lastName || '');
      this.form.controls.phone.setValue(this.contact()!.phone || '');
      this.form.controls.company.setValue(this.contact()!.company || '');
    }
  })

  async save(){
    const contact:ContactNew = this.contact() || {...CONTACTO_NUEVO_VACIO}; 
    contact.firstName = this.form.controls.firstName.value || '';
    contact.lastName = this.form.controls.lastName.value || '';
    contact.phone = this.form.controls.phone.value || '';
    contact.company = this.form.controls.company.value || '';
    contact.description = this.form.controls.description.value || '';
    contact.address = this.form.controls.address.value || '';
    contact.email = this.form.controls.email.value || '';
    if(!contact.id){
      //Creación de contacto
      const res = await this.contactsService.createContact(contact);
      if(res.success && res.data) {
        //Éxito creando contacto
        this.snackBarService.openSnackbarSuccess(res.message);
        this.router.navigate(['/contacts',res.data.id]);
      }
      else {
        //Error creando contacto
        this.snackBarService.openSnackbarError(res.message); 
      }
    } else {
      //Edición de contacto
      const res = await this.contactsService.updateContact(contact as Contact);
      if(res.success && res.data){
        //Éxito editando contacto
        this.snackBarService.openSnackbarSuccess(res.message);
      }
      //Error editando contacto
      this.snackBarService.openSnackbarError(res.message);
    }
  }

  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl(''),
    phone: new FormControl('',Validators.required),
    company: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('',Validators.email),
    description: new FormControl(''),
    // image: new FormControl(''),
  });
}
