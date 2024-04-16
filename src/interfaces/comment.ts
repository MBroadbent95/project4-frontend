import { IUser } from "./user";

export interface IComment {
    content: string;
    created_at: string;
    id: number;
    updated_at: string;
    user: IUser;
}