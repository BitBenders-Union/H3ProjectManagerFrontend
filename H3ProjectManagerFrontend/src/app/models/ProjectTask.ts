import { Comment } from './Comment';
import { UserDetail } from './UserDetail';
import { ProjectTaskStatus } from './ProjectTaskStatus';
import { Priority } from './Priority';
import { ProjectTaskCategory } from './ProjectTaskCategory';
import { User } from './user';
export class ProjectTask {
    public id? : number = 0;
    public name? : string = '';
    public projectId? : number = 0;
}

export interface ProjectTaskDetails{
    id?: number;
    name: string;
    description: string;
    projectId: number;
    priority: Priority;
    status: ProjectTaskStatus;
    projectTaskCategory: ProjectTaskCategory;
    projectTaskUserDetail?: User[];
    comments?: Comment[];
    
}