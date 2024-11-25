import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loadingService = inject(LoadingService);

  /** Realiza un get autenticado a nuestro backend */
  async get(URI:string){
    const token = localStorage.getItem("token");
    let headers:HeadersInit = {}
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    this.loadingService.addLoad(URI);
    const res = await fetch(environment.API_URL+URI,{
      headers
    })
    this.loadingService.deleteLoad(URI);
    return res; 
  }

  async post(URI:string,body:any){
    if(typeof body !== "object" && typeof body !== "string") return;
    const token = localStorage.getItem("token");
    let headers:HeadersInit = { "content-type" : "Application/json" }
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    this.loadingService.addLoad(URI);
    const res = await fetch(environment.API_URL+URI,{
      method: "POST",
      headers,
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
    this.loadingService.deleteLoad(URI);
    return res;
  }

  async put(URI:string,body:any){
    if(typeof body !== "object" && typeof body !== "string") return;
    const token = localStorage.getItem("token");
    let headers:HeadersInit = { "content-type" : "Application/json" }
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    const res = await fetch(environment.API_URL+URI,{
      method: "PUT",
      headers,
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
    this.loadingService.deleteLoad(URI);
    return res;
  }

  async delete(URI:string){
    const token = localStorage.getItem("token");
    let headers:HeadersInit = {}
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    const res = await fetch(environment.API_URL+URI,{
      method: "DELETE",
      headers,
    })
    this.loadingService.deleteLoad(URI);
    return res;
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
