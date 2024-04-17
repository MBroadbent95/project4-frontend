import { IUser } from "./user";

export interface IComment {
    content: string;
    created_at: string;
    id: number;
    user_id: number;
    recipe_id: number;
    updated_at: string;
    user: IUser;
}