import { Department } from "./Department";
import { Priority } from "./Priority";
import { ProjectCategory } from "./ProjectCategory";
import { ProjectStatus } from "./ProjectStatus";
import { User } from "./user";

export interface LocalProject{ 
    id?: number;
    name?: string;
    startDate?: Date;
    endDate?: Date;
    status?: ProjectStatus;
    category?: ProjectCategory;
    priority?: Priority;
    client?: string;
    projectTasks?: string;
    departments?: Department[];
    users?: User[];
    owner?: string;
}