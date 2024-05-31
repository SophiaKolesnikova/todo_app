import { User } from '@/types/user.type';

export const users: User[] = [
    {
        id: '1',
        email: 'user@user.com',
        name: 'User',
        password: '12345',
        role: 'user',
    },
    {
        id: '2',
        email: 'admin@admin.com',
        name: 'Admin',
        password: '67890',
        role: 'admin',
    },
];