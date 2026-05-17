export interface NavItem {
    label: string;
    path: string;
}

export const navigationLinks: NavItem[] = [
    { label: 'Mates', path: '/categoria/mates' },
    { label: 'Personalizados', path: '/personalizados' },
    { label: 'Contacto', path: '/contacto' },
];