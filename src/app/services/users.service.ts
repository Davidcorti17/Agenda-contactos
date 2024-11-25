import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PostUserRequest, User } from '../interfaces/usuario';
import { userToUserRequest } from '../utils/userMap';
import { ResponseData } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  readonly resource = "Contact"

  async getAll():Promise<ResponseData>{
    this.get(this.resource);
    return {
      success: false,
      message: "Error indeterminado"
    }
  }

  async getById(userId:string):Promise<ResponseData>{
    this.get(`${this.resource}/${userId}`);
    return {
      success: false,
      message: "Error indeterminado"
    }
  }

  async updateUser(user:User):Promise<ResponseData>{
    const userRequest: PostUserRequest = userToUserRequest(user);
    this.put(this.resource,user)
    return {
      success: false,
      message: "Error indeterminado"
    }
  }

  async deleteUser(userId:string):Promise<ResponseData>{
    this.delete(`${this.resource}/${userId}`);
    return {
      success: false,
      message: "Error indeterminado"
    }
  }

}
