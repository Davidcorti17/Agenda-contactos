export interface User {
  username: string,
  email: string,
  role: Role
}

export type Role = "Admin" | "User" | "Guest";
export type State = "Active" | "Archived" | "Confirmed";

export interface PostUserRequest{
  FirstName: string,
  LastName: string,
  Password: string,
  UserName: string,
}

export interface GetUserRequest{
  Id: string,
  FirstName: string,
  LastName: string,
  Password: string,
  UserName: string,
  State: State,
  Role: Role
}