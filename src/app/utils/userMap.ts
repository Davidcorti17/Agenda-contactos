import { User, PostUserRequest } from "../interfaces/usuario";

export function userToUserRequest(user:User):PostUserRequest{
  const userRequest : PostUserRequest = {
    FirstName: user.username,
    LastName: "",
    Password: "",
    UserName: user.username,
  }
  return userRequest;
}

// export function userRequestToUser(user:UserRequest):User{
//   const user : User = {
//     username: "",
//     email: "",
//     role: "Admin"
//   }
//   return user;
// }