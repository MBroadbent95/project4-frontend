import React, { useState, useEffect } from "react";
import Card from "../components/Recipe";
import { IRecipe } from "../interfaces/recipe";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import { baseUrl } from "../config"

export default function Home() {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await fetch(`${baseUrl}/recipes`);
                const data: IRecipe[] = await response.json();
                setRecipes(data.sort(() => 0.5 - Math.random()).slice(0, 4));
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        }
        fetchRecipes();
    }, []);

    const steps = [
        {
            title: "Explore Recipes",
            description:
                "Begin your culinary journey by following the link in the above Navbar. Have a look around and see if any tickle your fancy.",
        },
        {
            title: "Join the Foodies",
            description:
                "Sign up and create your own unique account.",
        },
        {
            title: "Share the Sauce",
            description:
                "Log in to unlock the power of sharing. You could be sharing someone's new favourite meal!",
        },
        {
            title: "Tuck In and Share your Experience",
            description:
                "Don't keep it to yourself, if you tried another foodie's recipe, let them know by adding a comment!",
        },
    ];

    const goToPrevSlide = () => {
        setCurrent(current === 0 ? recipes.length - 1 : current - 1);
    };

    const goToNextSlide = () => {
        setCurrent(current === recipes.length - 1 ? 0 : current + 1);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-200">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10 max-w-6xl mx-auto m-5">
                    <div className="text-center lg:text-left space-y-4 max-w-xl p-4">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Welcome to <span className="text-indigo-600">Tasteful Trove!</span>
                        </h1>
                        <p className="text-gray-700">
                            Welcome to Tasteful Trove, your culinary haven for exploring, discovering, and sharing delectable recipes! At Tasteful Trove, we invite you to embark on a gastronomic journey where every dish tells a story and every bite tantalizes the taste buds. Whether you're an aspiring chef, a seasoned home cook, or simply a lover of good food, our platform offers a treasure trove of recipes waiting to be uncovered. From savory classics to innovative creations, our diverse collection spans cuisines from around the globe and encompasses a wide range of meal types.
                        </p>
                        <p className="text-gray-700">
                            Dive into a world of culinary delights, where you can not only browse and search for your favorite recipes but also contribute your own culinary masterpieces. Create your profile, upload recipes complete with mouthwatering images, and organize them by cuisine or meal type.
                            {" "}
                            <Link
                                to="/signup"
                                className="text-indigo-600 font-bold hover:underline"
                            >
                                Join our vibrant community
                            </Link>
                            {" "} of food enthusiasts, exchange tips and tricks, and leave reviews to help fellow foodies discover their next culinary masterpiece. Welcome to Tasteful Trove – where every recipe is a culinary adventure waiting to be savored!
                        </p>
                        <p className="text-gray-700 italic">
                            Have fun browsing - Michael (SEB-78)
                        </p>
                    </div>

                    <div className="w-full max-w-2xl">
                        <h3 className="text-2xl font-semibold text-center mb-6">
                            Getting Started...
                        </h3>
                        <ol className="space-y-4">
                            {steps.map((step, index) => (
                                <li key={index} className="border-l-4 border-indigo-600 pl-4 py-2">
                                    <h4 className="text-lg font-semibold">{step.title}</h4>
                                    <p>{step.description}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="overflow-hidden relative w-full max-w-2xl pt-10 border-t border-gray-400 ">
                    <div
                        className="flex transition-transform ease-linear duration-700"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {recipes.map((recipe, index) => (
                            <div
                                key={recipe.id}
                                className="w-full flex-none"
                                style={{ minWidth: "100%" }}
                            >
                                <Card {...recipe} />

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
                        {recipes.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`cursor-pointer transition-all w-3 h-3 bg-white bg-opacity-10 rounded-full ${current === i ? "p-2 bg-blue-500" : "bg-opacity-20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}
