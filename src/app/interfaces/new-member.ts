import { UserMinimumDetails } from "./user-minimum-details";

export interface NewMember {
    projectId: number;
    members: UserMinimumDetails[];
}
