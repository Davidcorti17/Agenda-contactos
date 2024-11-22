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
  FirstName: string;
  LastName: string;
  Address?: string;
  Email: string;
  Image?: string;
  Number: string;
  Company?: string;
}
