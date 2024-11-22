import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestBodyFormat } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /** Realiza un get autenticado a nuestro backend */
  async get(URI:string){
    const token = localStorage.getItem("token");
    let headers:HeadersInit = {}
    if(token) headers = {...headers, authentication: "Bearer "+token };
    return await fetch(environment.API_URL+URI,{
      headers
    })
  }

  async post(URI:string,body:any){
    if(typeof body !== "object" && typeof body !== "string") return;
    const token = localStorage.getItem("token");
    let headers:HeadersInit = { "content-type" : "Application/json" }
    if(token) headers = {...headers, authentication: "Bearer "+token };
    return await fetch(environment.API_URL+URI,{
      method: "POST",
      headers,
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  }

  async put(URI:string,body:any){
    if(typeof body !== "object" && typeof body !== "string") return;
    const token = localStorage.getItem("token");
    let headers:HeadersInit = { "content-type" : "Application/json" }
    if(token) headers = {...headers, authentication: "Bearer "+token };
    return await fetch(environment.API_URL+URI,{
      method: "PUT",
      headers,
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  }

  async delete(URI:string){
    const token = localStorage.getItem("token");
    let headers:HeadersInit = {}
    if(token) headers = {...headers, authentication: "Bearer "+token };
    return await fetch(environment.API_URL+URI,{
      method: "DELETE",
      headers,
    })
  }

  // async decodeBody(res:Response, bodyFormat:RequestBodyFormat): Promise<object | string>{
  //   switch (bodyFormat){
  //     case 'json':
  //       return await res.json();
  //     case 'text':
  //       return await res.text();
  //   }

  // }
  
}
