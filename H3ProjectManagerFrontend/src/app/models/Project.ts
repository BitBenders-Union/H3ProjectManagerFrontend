import { Client } from "./Client";
import { Department } from "./Department";
import { Priority } from "./Priority";
import { ProjectCategory } from "./ProjectCategory";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectTaskDetails } from "./ProjectTask";
import { User } from "./user";

export class Project {
    public id? : number = 0;
    public name? : string = '';
    public startDate? : Date = new Date();
    public endDate? : Date = new Date();
}

export interface ProjectDashboard{
    id: number;
    name: string;
    category: string;
    owner: string;

}

export interface ProjectCreate{
    name: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus
    category: ProjectCategory;
    priority: Priority;
    owner: string;
    client?: Client;
    projectTasks?: ProjectTaskDetails[];
    department?: Department[];
    users?: User[];

}

export interface ProjectDetails{
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    tasks: ProjectTaskDetails[];
    category: ProjectCategory;
    priority: Priority;
    client: Client;
    department: Department[];
    user: User[];
    ownerId: number;
}