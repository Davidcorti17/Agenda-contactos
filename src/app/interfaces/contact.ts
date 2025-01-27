export interface Contact extends ContactNew {
  id: number,
  isFavorite?: boolean
}

/** Contacto nuevo o contacto editado */
export interface ContactNew {
  id?: number,
  firstName: string,
  lastName: string,
  phone: string,
  address?: string,
  email?: string,
  imageUrl?: string,
  company?: string,
  description?: string,
}

/** Un contacto como lo ve el backend */
export interface ContactGetDto {
  id: number;
  firstName: string;
  lastName: string;
  address?: string;
  number: string;
  email: string;
  image?: string;
  company?: string;
  description?: string;
  userId: number;
  isFavorite?: boolean
}

/** Un contacto como lo ve el backend para editar o crear */
export interface ContactPostDto {
  FirstName: string;
  LastName?: string;
  Address?: string;
  Number?: string;
  Email?: string;
  Image?: string;
  Company?: string;
  Description?: string
}

/** Contacto nuevo ejemplo */
export const CONTACTO_VACIO:ContactNew = {
  firstName: "",
  lastName: "",
  phone: ""
}