export interface UserProfile {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: 'user' | 'admin' | 'manager';
    token?: string;
}
