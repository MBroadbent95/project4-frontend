import { IUser } from "./user";

export interface IRecipe {
    id: string;
    name: string;
    cuisine: string;
    image: string;
    serving: string;
    prep_time: string;
    total_time: string;
    cal_serv: number;
    ingredients: string;
    directions_instructions: string;
    image_url: string;
    user_id: number;
    user: IUser;
}