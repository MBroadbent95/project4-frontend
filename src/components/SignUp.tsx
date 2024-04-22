import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    });

    const [errorData, setErrorData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    });

    function handleChange(e: any) {
        const fieldName = e.target.name;
        const newFormData = structuredClone(formData);
        newFormData[fieldName as keyof typeof formData] = e.target.value;
        setFormData(newFormData);

    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            e.preventDefault();
            const resp = await axios.post(`${baseUrl}/signup`, formData);
            console.log(resp.data);

            navigate("/login");
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors)
                setErrorData(error.response.data.errors);
            console.log("here is the error", error);
        }
    }
    console.log("here is the error data", errorData);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                name={"username"}
                                id={"username"}
                                onChange={handleChange}
                                value={formData.username}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.username && (
                                <small className="text-red-500">{errorData.username}</small>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <div>
                            <input
                                type="text"
                                name={"email"}
                                id={"email"}
                                onChange={handleChange}
                                value={formData.email}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.email && (
                                <small className="text-red-500">{errorData.email}</small>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div>
                            <input
                                type="password"
                                name={"password"}
                                id={"password"}
                                onChange={handleChange}
                                value={formData.password}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.password && (
                                <small className="text-red-500">{errorData.password}</small>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="passwordConfirmation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm password
                        </label>
                        <div>
                            <input
                                type="password"
                                name={"passwordConfirmation"}
                                id={"passwordConfirmation"}
                                onChange={handleChange}
                                value={formData.passwordConfirmation}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errorData.passwordConfirmation && (
                                <small className="text-red-500">
                                    {errorData.passwordConfirmation}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
