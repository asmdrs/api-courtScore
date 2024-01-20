import { Role } from "./role.enum";

export interface User{
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}