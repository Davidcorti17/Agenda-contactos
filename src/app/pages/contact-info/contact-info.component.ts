import { Component, computed, inject, input, resource, ResourceRef } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Contact, CONTACTO_VACIO } from '../../interfaces/contact';
import { SnackBarService } from '../../snack-bar.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-contact-info',
  imports: [CommonModule,NgOptimizedImage,RouterModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {

  contactsService = inject(ContactsService);
  groupsService = inject(GroupsService);
  snackBarService = inject(SnackBarService)
  id = input.required<number>();
  currentGroups = computed(()=> this.groupsService.groups.value()?.filter(grupo => grupo.contacts.some(contact => contact.id === this.id())))
  router = inject(Router);

  contact:ResourceRef<Contact> = resource({
      request: ()=>  ({contactId: this.id()}),
      loader: async({request})=> {
        const res = await this.contactsService.getById(request.contactId)
        if(res.success && res.data) return res.data;
        this.snackBarService.openSnackbarError(res.message);
        return {...CONTACTO_VACIO,id:0}
      }
    })

    toggleFavorite(){
      this.contact.value.set({...this.contact.value()!, isFavorite:!this.contact.value()!.isFavorite })
      this.contactsService.toggleFavorite(this.id()).then((res)=> {
        if(!res || !res.success){
          // Vuelvo el cambio atrás si no pude marcar como favorito
          this.contact.value.set({...this.contact.value()!, isFavorite:!this.contact.value()!.isFavorite })
          this.snackBarService.openSnackbarError("Error cambiando el estado de favorito");
        }
        this.contactsService.updateLocalContact(this.contact.value()!);
      }).catch((err)=> {
        // Vuelvo el cambio atrás si no pude marcar como favorito
        this.contact.value.set({...this.contact.value()!, isFavorite:!this.contact.value()!.isFavorite })
        this.snackBarService.openSnackbarError("Error cambiando el estado de favorito");
      })
    }

    addToGroup(groupId:number){
      //TODO
    }

    async delete(){
      const res = await this.contactsService.deleteContact(this.id())
      if(res && res.success){
        this.router.navigate(['/']);
      }
    }

}
