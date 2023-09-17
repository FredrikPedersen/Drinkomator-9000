export const USER_LS_KEY = "user";

export enum ROLE {
    USER= "User",
    ADMIN = "Admin"
}

export type User = {
    username: string,
    role: ROLE
}