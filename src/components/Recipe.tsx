import { Link } from "react-router-dom";
import { IRecipe } from "../interfaces/recipe";
// card classes was in the original code and might be a nice way to style, worth considering

export default function Card({ id, name, cuisine, serving, prep_time, total_time, cal_serv, ingredients, directions_instructions, image_url }: IRecipe) {

    return (
        <div>
            <Link
                to={`/recipes/${id}`}
                className=" flex flex-col flex-grow" //hover:shadow-lg
            >
                <div className="p-4 flex-grow">
                    <h3 className="text-center text-md lg:text-lg font-semibold">
                        {name}
                    </h3>
                    <p className="mt-1 text-center font-medium">{cuisine}</p>
                </div>
                <div className="mt-2 pt-2 border-t p-2">
                    <p className="text-xs lg:text-sm text-center">
                        Servings: <span className="font-medium">{serving}</span>
                    </p>
                </div>
                <div className="mt-2 pt-2 border-t p-2">
                    <p className="text-xs lg:text-sm text-center">
                        Prep Time: <span className="font-medium">{prep_time}</span>
                    </p>
                </div>
                <div className="mt-2 pt-2 border-t p-2">
                    <p className="text-xs lg:text-sm text-center">
                        Total Time: <span className="font-medium">{total_time}</span>
                    </p>
                </div>
                <div className="mt-2 pt-2 border-t p-2">
                    <p className="text-xs lg:text-sm text-center">
                        Calories Per Serving: <span className="font-medium">{cal_serv}</span>
                    </p>
                </div>
                {/* <div className="mt-4 pt-2 border-t p-4">
                    <p className="text-xs lg:text-sm text-center">
                        Ingredients: <span className="font-medium">{ingredients}</span>
                    </p>
                </div> */}
                {/* <div className="mt-4 pt-2 border-t p-4">
                    <p className="text-xs lg:text-sm text-center">
                        Directions & Instructions: <span className="font-medium">{directions_instructions}</span>
                    </p>
                </div> */}
                {image_url && (<img src={image_url} alt={name} className="mx-auto mt-4 rounded-lg" style={{ maxWidth: "50%", height: "auto" }} />)}

            </Link>
        </div>
    );
}
