import { Department } from "./Department";
import { User } from "./user";

export interface LocalProject{ 
    id?: number;
    name?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    category?: string;
    priority?: string;
    client?: string;
    projectTasks?: string;
    departments?: Department[];
    users?: User[];
    owner?: string;
}