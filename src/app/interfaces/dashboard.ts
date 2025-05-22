import { UserMinimumDetails } from "./user-minimum-details";

export interface Dashboard {
    projectId: Number;
    name: string;
    members: UserMinimumDetails[];
    pending: any[];
    progress: any[];
    finished: any[];
    
}
