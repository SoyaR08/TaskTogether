import { ProjectCard } from "../project/project-card"
import { TaskEsentialDetails } from "../task/task-esential-details"

export interface InitialDashboard {
    activeProjectsNumber: number,
    progressTasksNumber: number,
    toExpireTasksNumber: number,
    progressTasks: TaskEsentialDetails[],
    toExpireTasks: TaskEsentialDetails[],
    recentProyects: ProjectCard []
}
