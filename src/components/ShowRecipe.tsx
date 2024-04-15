import React, { SyntheticEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Recipe";
import { IRecipe } from "../interfaces/recipe";
import { ChevronLeft, ChevronRight } from "react-feather";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { Link } from "react-router-dom";

export default function ShowRecipe({ user }: { user: null | IUser }) {
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [carouselRecipes, setCarouselRecipes] = useState<IRecipe[]>([]);
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

        async function fetchRecipesForCarousel() {
            try {
                const response = await fetch("/api/recipes");
                const data: IRecipe[] = await response.json();
                setCarouselRecipes(data.sort(() => 0.5 - Math.random()).slice(0, 4));
            } catch (error) {
                console.error("Error fetching recipes for carousel:", error);
            }
        }

        fetchRecipe();
        fetchRecipesForCarousel();
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

    const goToPrevSlide = () => {
        setCurrent(current === 0 ? carouselRecipes.length - 1 : current - 1);
    };

    const goToNextSlide = () => {
        setCurrent(current === carouselRecipes.length - 1 ? 0 : current + 1);
    };

    if (!recipe) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    console.log("below me should be a github")
    console.log(recipe.user)
    return (
        <>
            <section className="container mx-auto pt-24 flex justify-center gap-8">
                <div className="flex flex-wrap justify-center lg:flex-nowrap gap-24">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2">
                        <Card
                            key={recipe.id}
                            name={recipe.name}
                            image={recipe.image}
                            cuisine={recipe.cuisine}
                            total_time={recipe.total_time}
                        />
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
            <section className="container mx-auto mt-36 mb-24 ">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Explore More Recipes
                </h2>
                <div className="overflow-hidden relative w-full max-w-2xl mx-auto pt-10">
                    <div
                        className="flex transition-transform ease-linear duration-700"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {carouselRecipes.map((carouselRecipe, index) => (
                            <div
                                key={carouselRecipe.id}
                                className="w-full flex-none"
                                style={{ minWidth: "100%" }}
                            >
                                <Card {...carouselRecipe} />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                        <button
                            onClick={goToPrevSlide}
                            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={goToNextSlide}
                            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                            aria-label="Next"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {carouselRecipes.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`cursor-pointer transition-all w-3 h-3 bg-white bg-opacity-10 rounded-full ${current === i ? "p-2 bg-blue-500" : "bg-opacity-20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
