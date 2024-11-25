import { Contact, ContactRequest } from "../interfaces/contact";

export function contactToContactRequest(contact:Contact):ContactRequest{
  const contactRequest : ContactRequest = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    number: contact.phone,
    email: contact.email || "",
    id: contact.id
  }
  if(contact.address) contactRequest.address = contact.address;
  if(contact.imageUrl) contactRequest.image = contact.imageUrl;
  if(contact.company) contactRequest.company = contact.company;
  return contactRequest;
}

export function contactRequestToContact(user:ContactRequest):Contact{
  const contact : Contact = {
    firstName: user.firstName,
    lastName: user.lastName,
    phone:user.number,
    id: user.id,
    email: user.email
  }
  if(user.image) contact.imageUrl = user.image
  if(user.address) contact.imageUrl = user.address
  if(user.company) contact.imageUrl = user.company
  return contact;
}