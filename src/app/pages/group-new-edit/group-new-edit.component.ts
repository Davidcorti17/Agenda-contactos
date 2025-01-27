import { Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SnackBarService } from '../../snack-bar.service';
import { GroupsService } from '../../services/groups.service';
import { Group, GRUPO_VACIO, NewGroup } from '../../interfaces/group';

@Component({
  selector: 'app-group-new-edit',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatInputModule],
  templateUrl: './group-new-edit.component.html',
  styleUrl: './group-new-edit.component.scss'
})
export class GroupNewEditComponent {
  groupsService = inject(GroupsService);
  router = inject(Router);
  snackBarService = inject(SnackBarService)


  id = input<number>();
  group = computed(()=> {
    if(!this.id()) return undefined;
    return this.groupsService.groups.value()?.find(group => group.id == this.id())
  });
  precompletarFormulario = effect(()=> {
    if(this.group()){
      this.form.controls.name.setValue(this.group()!.name || '');
      this.form.controls.description.setValue(this.group()!.description || '');
    }
  })

  async save(){
    const group:NewGroup | Group = this.group() || GRUPO_VACIO; 
    group.name = this.form.controls.name.value || '';
    group.description = this.form.controls.description.value || '';
    if(!this.id()){
      //Creación de grupo
      const res = await this.groupsService.createGroup(group);
      if(res.success && res.data) {
        //Éxito creando grupo
        this.snackBarService.openSnackbarSuccess(res.message);
        this.groupsService.groups.update((previous)=>  [... (previous || []),res.data!]);
        // this.router.navigate(['/contacts',res.data.id]);
      }
      else {
        //Error creando grupo
        this.snackBarService.openSnackbarError(res.message); 
      }
    } else {
      //Edición de grupo
      const res = await this.groupsService.updateGroup(group as Group);
      if(res.success && res.data){
        //Éxito editando grupo
        this.snackBarService.openSnackbarSuccess(res.message);
        this.groupsService.updateLocalGroup(res.data);
      }
      //Error editando grupo
      this.snackBarService.openSnackbarError(res.message);
    }
  }

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl(''),
  });
}
