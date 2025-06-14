export interface ListedProject {
    id: Number;
    name: string;
    status: number;
    description: string;
    start_date: string;
    end_date: string;
    project_img: string | null;
    owner: boolean
}
