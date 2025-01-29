import { Component, inject } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-groups',
  imports: [RouterModule, MatButtonModule,MatIconModule,MatCardModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groupsService = inject(GroupsService);

  async crearGrupo(){
    const res = await this.groupsService.createGroup({name:"Grupo "+this.groupsService.groups.value()?.length,description:"Descripción ejemplo"});
    if(res.success){

    }
  }

  async exportGroup(groupId:number){
    this.groupsService.export(groupId);
  }

  async deleteGroup(groupId:number){
    this.groupsService.deleteGroup(groupId);
  }
}
