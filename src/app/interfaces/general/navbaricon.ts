export interface NavbarIcon {
    iconName: string;
    svg: string;
    svgfilled: string;
    route: string;
    templateName: string;
}

export const navbarIcons: NavbarIcon[] = [
    {
        iconName: 'Inicio',
        svg: 'assets/homebasic.svg',
        svgfilled: 'assets/homefilled.svg',
        route: '/dashboard',
        templateName: 'dashboard'
    },
    {
        iconName: 'Mis Proyectos',
        svg: 'assets/folder.svg',
        svgfilled: 'assets/folder_openfilled.svg',
        route: '/projects',
        templateName: 'project'
    },
    {
        iconName: 'Tareas',
        svg: 'assets/clipboard.svg',
        svgfilled: 'assets/clipboardfilled.svg',
        route: '/tasks',
        templateName: 'task'
    },
    {
        iconName: 'Nuevo Proyecto',
        svg: 'assets/add_circle.svg',
        svgfilled: 'assets/add_circle_filled.svg',
        route: '/projects/newproject',
        templateName: 'newProject'
    },
        {
        iconName: 'Añadir Colaborador',
        svg: 'assets/person_add.svg',
        svgfilled: 'assets/person_add_filled.svg',
        route: '/addColaborators',
        templateName: 'addCollab'
    },
        {
        iconName: 'Configuración',
        svg: 'assets/settings.svg',
        svgfilled: 'assets/settings_filled.svg',
        route: '/settings',
        templateName: 'settings'
    }

]