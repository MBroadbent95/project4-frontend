import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IRecipe } from "../interfaces/recipe";

export default function EditRecipe() {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        cuisine: "",
        serving: "",
        prep_time: "",
        total_time: "",
        cal_serv: "",
        ingredients: "",
        directions_instructions: "",
        image_url: ""
    });

    // const [adviceCharCount, setAdviceCharCount] = useState(0);
    // const [headingCharCount, setHeadingCharCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchRecipe() {
            const resp = await fetch(`/api/recipes/${recipeId}`);
            const recipeData = await resp.json();
            const recipeToEdit = {
                name: recipeData.name,
                cuisine: recipeData.cuisine,
                serving: recipeData.serving,
                prep_time: recipeData.prep_time,
                total_time: recipeData.total_time,
                cal_serv: recipeData.cal_serv,
                ingredients: recipeData.ingredients,
                directions_instructions: recipeData.directions_instructions,
                image_url: recipeData.image_url
            };
            setFormData(recipeToEdit);
            // setAdviceCharCount(tipData.tip.length);
            // setHeadingCharCount(tipData.heading.length);
        }
        fetchRecipe();
    }, []);

    function handleChange(e: any) {
        const fieldName = e.target.name;
        const newFormData = structuredClone(formData);
        newFormData[fieldName as keyof typeof formData] = e.target.value;
        setFormData(newFormData);
        // if (e.target.id === "heading") {
        //     setHeadingCharCount(e.target.value.length);
        // }
        // if (e.target.id === "tip") {
        //     setAdviceCharCount(e.target.value.length);
        // }
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const resp = await axios.put(`/api/recipes/${recipeId}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(resp.data);
            navigate("/recipe");//change navigation HERE ---------------------------------------------------------
        } catch (e: any) {
            if (e.response && e.response.data) {
                setErrorMessage(e.response.data);
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height =
                textAreaRef.current.scrollHeight + "px";
        }
    }, [formData.directions_instructions]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
                    Edit Your Recipe
                </h2>
                {errorMessage && (
                    <div className="text-red-500 text-center font-bold mb-4">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <div className="control">
                            <input
                                disabled
                                type="text"
                                name={"name"}
                                id={"name"}
                                value={formData.name}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="cuisine"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Cuisine
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"cuisine"}
                                id={"cuisine"}
                                onChange={handleChange}
                                value={formData.cuisine}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="serving"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Serving
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"serving"}
                                id={"serving"}
                                onChange={handleChange}
                                value={formData.serving}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="prep_time"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Prep Time
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"prep_time"}
                                id={"prep_time"}
                                onChange={handleChange}
                                value={formData.prep_time}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="total_time"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Total Time
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"total_time"}
                                id={"total_time"}
                                onChange={handleChange}
                                value={formData.total_time}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="cal_serv"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Calories Per Serving
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"cal_serv"}
                                id={"cal_serv"}
                                onChange={handleChange}
                                value={formData.cal_serv}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="ingredients"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ingredients
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"ingredients"}
                                id={"ingredients"}
                                onChange={handleChange}
                                value={formData.ingredients}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="directions_instructions"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Directions & Instructions
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"directions_instructions"}
                                id={"directions_instructions"}
                                onChange={handleChange}
                                value={formData.directions_instructions}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="image_url"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Image URL
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"image_url"}
                                id={"image_url"}
                                onChange={handleChange}
                                value={formData.image_url}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />

                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-300">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
