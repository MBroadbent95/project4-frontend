import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// You have commented out character counts, the code is there should you want it. You still need to change handlesubmit destination.
export default function CreateRecipe() {
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
    });

    const [errorData, setErrorData] = useState({
        name: "",
        cuisine: "",
        serving: "",
        prep_time: "",
        total_time: "",
        cal_serv: "",
        ingredients: "",
        directions_instructions: "",
    });

    // const [recipeCharCount, setRecipeCharCount] = useState(0);
    // const [headingCharCount, setHeadingCharCount] = useState(0);

    function handleChange(e: any) {
        const fieldName = e.target.name;
        const newFormData = structuredClone(formData);
        const newErrorData = structuredClone(errorData);
        newFormData[fieldName as keyof typeof formData] = e.target.value;
        newErrorData[fieldName as keyof typeof errorData] = "";
        setFormData(newFormData);
        setErrorData(newErrorData);
        // if (e.target.id === "heading") {
        //     setHeadingCharCount(e.target.value.length);
        // }
        // if (e.target.id === "recipe") {
        //     setRecipeCharCount(e.target.value.length);
        // }
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const resp = await axios.post("/api/recipes", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(resp.data);
                navigate("/recipe"); //edit to match recipe list destination
            }
        } catch (e: any) {
            setErrorData(e.response.data.errors);
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
                <h2 className="text-xl font-bold mb-4 text-center text-red-500">
                    Share Recipe
                </h2>
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
                                type="text"
                                name={"name"}
                                id={"name"}
                                onChange={handleChange}
                                value={formData.name}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.name && (
                                <small className="text-red-500">{errorData.name}</small>
                            )}
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
                            {errorData.cuisine && (
                                <small className="text-red-500">{errorData.cuisine}</small>
                            )}
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
                            {errorData.serving && (
                                <small className="text-red-500">{errorData.serving}</small>
                            )}
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
                            {errorData.prep_time && (
                                <small className="text-red-500">{errorData.prep_time}</small>
                            )}
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
                            {errorData.total_time && (
                                <small className="text-red-500">{errorData.total_time}</small>
                            )}
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
                            {errorData.cal_serv && (
                                <small className="text-red-500">{errorData.cal_serv}</small>
                            )}
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
                            {errorData.ingredients && (
                                <small className="text-red-500">{errorData.ingredients}</small>
                            )}
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
                            {errorData.directions_instructions && (
                                <small className="text-red-500">{errorData.directions_instructions}</small>
                            )}
                        </div>
                    </div>

                    {/* <div>
                        <label
                            htmlFor="heading"
                            className="block text-sm font-medium text-gray-700"
                        >
                            {`Heading (${headingCharCount}/15)`}
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"heading"}
                                id={"heading"}
                                maxLength={15}
                                onChange={handleChange}
                                value={formData.heading}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.heading && (
                                <small className="text-red-500">{errorData.heading}</small>
                            )}
                        </div>
                    </div> */}
                    {/* <div>
                        <label
                            htmlFor="tip"
                            className="block text-sm font-medium text-gray-700"
                        >
                            {`Your Advice (${adviceCharCount}/200)`}
                        </label>
                        <div>
                            <textarea
                                ref={textAreaRef}
                                name={"tip"}
                                id={"tip"}
                                maxLength={200}
                                onChange={handleChange}
                                value={formData.tip}
                                className="hide-scrollbar resize-none mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32"
                            />
                            {errorData.tip && (
                                <small className="text-red-500">{errorData.tip}</small>
                            )}
                        </div>
                    </div> */}
                    <div className="flex justify-center">
                        {/* {errorData.misc && (
                            <small className="text-red-500">{errorData.misc}</small>
                        )} */}
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
