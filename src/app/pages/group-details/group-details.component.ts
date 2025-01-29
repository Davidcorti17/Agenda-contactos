import { Component, inject, input, resource, ResourceRef } from '@angular/core';
import { Group } from '../../interfaces/group';
import { GroupsService } from '../../services/groups.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-details',
  imports: [CommonModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent {
  id = input.required<number>()
  snackBarService = inject(SnackBarService)
  groupsService = inject(GroupsService);

  group:ResourceRef<Group | undefined> = resource({
    request: ()=>  ({groupId: this.id()}),
    loader: async({request})=> {
      const res = await this.groupsService.getById(request.groupId)
      if(res.success && res.data) return res.data;
      this.snackBarService.openSnackbarError(res.message);
      return
    }
  })
}
