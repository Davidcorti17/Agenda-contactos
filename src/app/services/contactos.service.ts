import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Contact, ContactRequest } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactosService extends ApiService {

  getAll(){
    this.get("contacts")
  }

  getById(userId:string){
    this.get(`contacts/${userId}`)
  }

  createUser(user:Contact){
    this.post("contacts",user)
  }

  updateUser(user:Contact){
    this.put("contacts",user)
  }

  deleteUser(userId:string){
    this.delete(`contacts/${userId}`)
  }
    
}
