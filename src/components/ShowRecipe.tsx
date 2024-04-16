import React, { SyntheticEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Recipe";
import { IRecipe } from "../interfaces/recipe";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { Link } from "react-router-dom";

export default function ShowRecipe({ user }: { user: null | IUser }) {
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [current, setCurrent] = useState(0);
    const { recipeId } = useParams<{ recipeId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch(`/api/recipes/${recipeId}`);
                const data: IRecipe = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        }
        fetchRecipe();

    }, [recipeId]);

    async function deleteRecipe(e: SyntheticEvent) {
        try {
            const token = localStorage.getItem("token");
            await axios.delete("/api/recipes/" + recipeId, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/recipe");// change destination -------------------------------
        } catch (e: any) {
            console.log(e.response.data);
        }
    }


    if (!recipe) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    console.log("below me should be a github")
    console.log(recipe.image_url)
    return (
        <>
            <section className="container mx-auto max-w-7xl pt-24 flex justify-center gap-8">
                <div className="flex flex-wrap justify-center lg:flex-nowrap gap-24">
                    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 px-4 py-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                            <p className="text-gray-600">{recipe.cuisine}</p>
                            <img src={recipe.image_url} alt={recipe.name} className="w-full mt-4 rounded-lg shadow-md" style={{ maxWidth: "50%", height: "auto" }} />
                            <div className="mt-4 flex flex-col">
                                <div className="flex justify-between mb-2">
                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold mb-2">Serving:</h4>
                                        <p className="text-gray-600">{recipe.serving}</p>
                                    </div>
                                    <div className="mt-4 ml-8">
                                        <h4 className="text-lg font-semibold mb-2">Prep Time:</h4>
                                        <p className="text-gray-600">{recipe.prep_time}</p>
                                    </div>
                                    <div className="mt-4 ml-8">
                                        <h4 className="text-lg font-semibold mb-2">Total Time:</h4>
                                        <p className="text-gray-600">{recipe.total_time}</p>
                                    </div>
                                    <div className="mt-4 ml-8">
                                        <h4 className="text-lg font-semibold mb-2">Calories per Serving</h4>
                                        <p className="text-gray-600">{recipe.cal_serv}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
                                <p className="text-gray-600">{recipe.ingredients}</p>
                            </div>
                            <div className="mt-9">
                                <h4 className="text-lg font-semibold mb-2">Directions & Instructions</h4>
                                <p className="text-gray-600">{recipe.directions_instructions}</p>
                            </div>

                        </div>
                        <div className="flex justify-center mt-4">
                            {recipe && user?._id === recipe.user._id && (
                                <Link to={"/recipe/edit/" + recipeId} className="mr-4">
                                    <button className="bg-blue-500 text-white px-10 py-2 rounded-full hover:bg-blue-400 text-sm">
                                        Edit Recipe
                                    </button>
                                </Link>
                            )}
                            {recipe && (user?._id === recipe.user._id || user?.isAdmin) && (
                                <button
                                    onClick={deleteRecipe}
                                    className="bg-red-500 text-white px-10 py-2 rounded-full hover:bg-red-400 text-sm"
                                >
                                    Delete Recipe
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
}
