import { UserMember } from "./user/user-member";


export interface Dashboard {
    projectId: Number;
    name: string;
    members: UserMember[];
    pending: any[];
    progress: any[];
    finished: any[];
    
}
