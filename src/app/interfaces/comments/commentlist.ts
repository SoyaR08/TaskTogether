export interface Commentlist {
    id: Number;
    content: string;
    date: string;
    user: {
        id: Number;
        name: string;
        email: string;
        profile_pic: string;
    };
    taskId: Number;
    owner: boolean;
}
