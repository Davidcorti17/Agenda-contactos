export interface Contact extends ContactNew {
  id: string,
}

export interface ContactNew {
  id?: string,
  firstName: string,
  lastName: string,
  phone: string,
  address?: string,
  email?: string,
  imageUrl?: string,
  company?: string,
  description?: string,
}

export interface ContactRequest {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  image?: string;
  number: string;
  company?: string;
}
