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