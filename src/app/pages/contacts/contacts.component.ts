import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContactsService } from '../../services/contacts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-contactos',
  imports: [CommonModule,RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent{
  authService = inject(AuthService);
  contactsService = inject(ContactsService);
  groupsService = inject(GroupsService);

  async crearGrupo(){
    const res = await this.groupsService.createGroup({name:"Grupo "+this.groupsService.groups.value()?.length,description:"Descripción ejemplo"});
    if(res.success){

    }
  }

  async exportGroup(groupId:number){
    this.groupsService.export(groupId);
  }

  async exportContacts(){
    this.contactsService.export();
  }

  async deleteGroup(groupId:number){
    this.groupsService.deleteGroup(groupId);
  }
}
