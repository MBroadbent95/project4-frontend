import { Link } from "react-router-dom";
import { IRecipe } from "../interfaces/recipe";
// card classes was in the original code and might be a nice way to style, worth considering

export default function Card({ _id, name, cuisine, serving, prep_time, total_time, cal_serv, ingredients, directions_instructions }: IRecipe) {

    return (
        <div>
            <Link
                to={`/recipe/${_id}`}
                className="hover:shadow-lg flex flex-col flex-grow"
            >
                <div className="p-4 flex-grow">
                    <h3 className="text-center text-md lg:text-lg font-semibold">
                        {name}
                    </h3>
                    <p className="mt-1 text-center">{cuisine}</p>
                </div>
                <div className="flex-grow"></div>
                <div className="mt-4 pt-2 border-t p-4">
                    <p className="text-xs lg:text-sm text-center">
                        Total Time: <span className="font-medium">{total_time}</span>
                    </p>
                </div>
            </Link>
        </div>
    );
}
