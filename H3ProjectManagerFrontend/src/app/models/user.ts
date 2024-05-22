import { Role } from './Role';
import { Department } from "./Department";

export class User{
    public id? : number = 0;
    public username? : string = "";
    public firstName? : string = "";
    public lastName? : string = "";
}

export interface UserWithDepartment extends User{
    createdDate: Date;
    department: Department;
    role: Role;
}