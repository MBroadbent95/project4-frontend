import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import { number } from "yargs";

interface FormData {
    name: string;
    cuisine: string;
    serving: string;
    prep_time: string;
    total_time: string;
    cal_serv: string;
    ingredients: string;
    directions_instructions: string;
    image_url: string;
    user_id: number | undefined

}

export default function CreateRecipe({ user }: { user: IUser | null }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        cuisine: "",
        serving: "",
        prep_time: "",
        total_time: "",
        cal_serv: "",
        ingredients: "",
        directions_instructions: "",
        image_url: "",
        user_id: user?.id

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
        image_url: ""
    });

    // const [recipeCharCount, setRecipeCharCount] = useState(0);
    // const [headingCharCount, setHeadingCharCount] = useState(0);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fieldName = e.target.name;
        const newFormData = structuredClone(formData) as any;
        const newErrorData = structuredClone(errorData);
        newFormData[fieldName as keyof typeof formData] = e.target.value;
        newErrorData[fieldName as keyof typeof errorData] = "";
        setFormData(newFormData);
        setErrorData(newErrorData);
    }


    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (token) {
                // Include user_id directly in the form data
                const formDataWithUserId = {
                    ...formData,
                    user_id: user?.id
                };
                const resp = await axios.post("/api/recipes", formDataWithUserId, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(resp.data);
                navigate("/recipe");
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
    console.log(`the current front end user is`, user?.id)
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
                    <div>
                        <label
                            htmlFor="image_url"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Image
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"image_url"}
                                id={"image_url"}
                                onChange={handleChange}
                                placeholder="Please paste a valid Imgur url"
                                value={formData.image_url}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.image_url && (
                                <small className="text-red-500">{errorData.directions_instructions}</small>
                            )}
                        </div>
                    </div>
                    <input type="hidden" name="user_id" value={user?.id} />
                    <div className="flex justify-center">
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
