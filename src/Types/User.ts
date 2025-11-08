import { Role } from "./Role";

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: Date
}

export interface UserRole {
    user: User;
    roles: Role[]
}