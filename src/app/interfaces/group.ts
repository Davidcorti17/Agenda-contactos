import { Contact, ContactGetDto } from "./contact"

/** Nuevo grupo de contactos */
export interface NewGroup {
  name: string,
  description?: string,
}

/** Grupo de contactos */
export interface Group extends NewGroup{
  id: number,
  contacts: Contact[]
}

/** Grupo de contactos según el back */
export interface GroupGetDto {
  id: number,
  name: string,
  ownerId: number
  description?: string,
  contacts?: ContactGetDto[]
}

/** Nuevo grupo de contactos según el back */
export interface GroupPostDto {
  Name: string;
  Description?: string;
}

export const GRUPO_VACIO: NewGroup = {name:""};