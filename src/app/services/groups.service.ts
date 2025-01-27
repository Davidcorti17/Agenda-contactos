import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { AuthService } from './auth.service';
import { SnackBarService } from '../snack-bar.service';
import { Group, GroupGetDto, GroupPostDto, NewGroup } from '../interfaces/group';
import { ResponseData } from '../interfaces/responses';
import { ApiService } from './api.service';
import { groupGetDtoToGroup, groupToGroupPostDto } from '../utils/groupMap';
import { parseCSV } from '../utils/CSV';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends ApiService {

  authService = inject(AuthService);
  snackbarService = inject(SnackBarService);
  readonly resource = "Groups";

  groups:ResourceRef<Group[]> = resource({
    request: ()=> ({token: this.authService.token()}),
    loader: async({request})=> {
      if(!request.token) return [];
      const res = await this.getAll();
      if(res.success && res.data) return res.data;
      this.snackbarService.openSnackbarError(res.message);
      return [];
    }
  })

  async getAll():Promise<ResponseData<Group[]|null>>{
    const res = await this.get(this.resource)
    if(!res || !res.ok){
      return {
        success: false,
        message: "Error buscando grupos",
      }
    }
    const resJson:GroupGetDto[] = await res.json();
    if(resJson) {
      return {
        success: true,
        message: "Grupos encontrados",
        data: resJson.map(contactRequest => groupGetDtoToGroup(contactRequest)) 
      }
    }
    return {
      success: false,
      message: "Error indeterminado encontrando grupos",
    }
  }
  
  async getById(groupId:string):Promise<ResponseData<Group|null>> {
    if(this.groups.hasValue()){
      const groupLocal = this.groups.value()!.find(group => group.id);
      if(groupLocal) return {
        success: true,
        message: "Grupo encontrado con información local",
        data: groupLocal
      };
    }
    const res = await this.get(`${this.resource}/${groupId}`)
    if(!res || !res.status){
      return {
        success: false,
        message: "Grupo no encontrado",
      }
    }
    const resJson:GroupGetDto = await res.json();
    if(resJson) {
      return {
        success: true,
        message: "Grupo encontrado",
        data: groupGetDtoToGroup(resJson)
      }
    }
    return {
      success: false,
      message: "Error indeterminado encontrando grupo",
    }
  }

  async createGroup(group:NewGroup):Promise<ResponseData<Group>>{
    const groupPostDto:GroupPostDto = groupToGroupPostDto(group);
    const res = await this.post(this.resource,groupPostDto);
    if(!res || !res.status){
      return {
        success: false,
        message: "Error creando grupo",
      }
    }
    const resJson:GroupGetDto = await res.json();
    if(resJson) {
      return {
        success: true,
        message: "Grupo creado con éxito",
        data: groupGetDtoToGroup(resJson)
      }
    }
    return {
      success: false,
      message: "Error indeterminado encontrando contacto",
    }
  }

  async updateGroup(group:Group):Promise<ResponseData<Group>>{
    const groupPostDto:GroupPostDto = groupToGroupPostDto(group);
    const res = await this.put(this.resource,groupPostDto);
    if(!res || !res.status){
      return {
        success: false,
        message: "Error editando grupo",
      }
    }
    return {
      success: true,
      message: "Grupo editado con éxito",
      data: group
    }
  }

  async deleteGroup(groupId:number):Promise<ResponseData>{
    const res = await this.delete(`${this.resource}/${groupId}`);
    if(!res || !res.status){
      return {
        success: false,
        message: "Error eliminado grupo",
      }
    }
    return {
      success: true,
      message: "Grupo editado con éxito",
    }
  }

  /** Exporta un grupo en CSV */
  async export(groupId:number){
    const res = await this.get(`${this.resource}/${groupId}`);
    if(!res || !res.status){
      return {
        success: false,
        message: "Error eliminado grupo",
      }
    }
    //Generar CSV con texto
    const csvString = await res.text();
    if(!csvString) return {
      success: true,
      message: "Error exportando grupo",
    }
    const csv = parseCSV(csvString);
    return {
      success: true,
      message: "Grupo editado con éxito",
    }
  }

  /** Actualiza un grupo de manera local así no tenemos que pedir la info al backend de nuevo */
    updateLocalGroup(group:Group){
      const gruposEditados = this.groups.value()!.map(existentGroup => existentGroup.id === group.id ? group : existentGroup);
      this.groups.value.set(gruposEditados);
    }
    
}
