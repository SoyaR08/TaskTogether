import { UserMinimumDetails } from "./user-minimum-details";

export interface Task {
    id: Number;
    name: string;
    description: string;
    limitDate: string;
    status: number;
    priority: number;
    userCreator: UserMinimumDetails;
    workers: UserMinimumDetails[];
}
