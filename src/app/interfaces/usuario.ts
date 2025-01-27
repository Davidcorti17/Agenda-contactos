export interface User {
  email: string,
  firstName: string,
  lastName: string
}

export type State = "Active" | "Archived" | "Confirmed";

export interface UserPostDto{
  FirstName: string,
  LastName: string,
  Password: string,
  Email: string,
}

export interface UserPostRes{
  Id: number,
  FirstName: string,
  LastName: string,
  Email: string,
  State: State,
}

export interface UserGetDto{
  Id: number,
  FirstName: string,
  LastName: string,
  Email: string,
  State: State,
}