import React, { SyntheticEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Recipe";
import { IRecipe } from "../interfaces/recipe";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { Link } from "react-router-dom";
import { IComment } from "../interfaces/comment"
import { baseUrl } from "../config";

export default function ShowRecipe({ user }: { user: null | IUser }) {
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [current, setCurrent] = useState(0);
    const { recipeId } = useParams<{ recipeId: string }>();
    const navigate = useNavigate();
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch(`${baseUrl}/recipes/${recipeId}`);
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
            await axios.delete(`${baseUrl}/recipes/` + recipeId, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/recipe");// change destination -------------------------------
        } catch (e: any) {
            console.log(e.response.data);
        }
    }

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.get(`${baseUrl}/recipes/${recipeId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error)
            }
        }
        fetchComments();
    }, [recipeId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${baseUrl}/recipes/${recipeId}/comments`, { content: commentContent },
                { headers: { Authorization: `Bearer ${token}` }, }
            );
            setComments([...comments, response.data]);
            setCommentContent("");

        } catch (error) {
            console.error("Error posting comment:", error)
        }
    }

    const deleteComment = async (commentId: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${baseUrl}/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    if (!recipe) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    console.log(`the current front end user is ${user?.id}`)
    // console.log(`the comment data is ${comments[0].user_id}`)
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
                            {recipe && user?.id === recipe.user.id && (
                                <Link to={"/recipe/edit/" + recipeId} className="mr-4">
                                    <button className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-blue-400 text-sm">
                                        Edit Recipe
                                    </button>
                                </Link>
                            )}
                            {recipe && (user?.id === recipe.user.id || user?.isAdmin) && (
                                <button
                                    onClick={deleteRecipe}
                                    className="bg-red-500 text-white px-10 py-2 rounded-lg hover:bg-red-400 text-sm"
                                >
                                    Delete Recipe
                                </button>
                            )}
                        </div>
                        {comments && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-2">Comments</h4>
                                <ul>
                                    {comments.map(comment => (
                                        <div className="block w-full mt-4 border-gray-300 rounded-md shadow-sm bg-white ">
                                            <li className="font-semibold" key={comment.id}>{comment.content}</li>
                                            {comment.created_at && (
                                                <li className="text-xs" key={comment.created_at}>Posted on {comment.created_at.substring(0, 10)}</li>
                                            )}
                                            {user?.id === comment.user_id && (
                                                <button className="text-xs hover:text-red-500" onClick={(e) => deleteComment(comment.id, e)}>Delete Comment?</button>
                                            )}
                                        </div>
                                    ))}
                                </ul>
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        value={commentContent}
                                        onChange={e => setCommentContent(e.target.value)}
                                        rows={4}
                                        placeholder="Write your comment..."
                                        className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    ></textarea>
                                    {user ? (
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 mt-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Post Comment
                                        </button>
                                    ) : (
                                        <p className="mt-2 text-gray-600">You must be logged in to post a comment</p>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>

                </div>
            </section>

        </>
    );
}
