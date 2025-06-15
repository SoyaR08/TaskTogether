import { UserMinimumDetails } from './user-minimum-details';
export interface AddProject {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    userCreator: Number;
    members: UserMinimumDetails[];
}

