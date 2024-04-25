import { Priority } from "./Priority";
import { ProjectCategory } from "./ProjectCategory";
import { ProjectStatus } from "./ProjectStatus";
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
    category: ProjectCategory;
    owner: User;

}

export interface ProjectCreate{
    name: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus
    category: ProjectCategory;
    priority: Priority;
    ownerId: number;

}