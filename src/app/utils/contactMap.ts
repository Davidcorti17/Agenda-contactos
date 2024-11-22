import { Contact, ContactRequest } from "../interfaces/contact";

export function contactToContactRequest(contact:Contact):ContactRequest{
  const contactRequest : ContactRequest = {
    FirstName: contact.firstName,
    LastName: contact.lastName,
    Number: contact.phone,
    Email: contact.email || "",
  }
  if(contact.address) contactRequest.Address = contact.address;
  if(contact.imageUrl) contactRequest.Image = contact.imageUrl;
  if(contact.company) contactRequest.Company = contact.company;
  return contactRequest;
}

export function contactRequestToContact(user:ContactRequest):Contact{
  const contact : Contact = {
    firstName: "",
    lastName: "",
    phone: ""
  }
  return contact;
}