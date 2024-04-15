import React from "react";
import { IRecipe } from "../interfaces/recipe";
import Card from "./Recipe";
import { react } from "@babel/types";

type Tips = null | Array<IRecipe>;

function RecipesList() {
    const [recipes, setRecipes] = React.useState<Tips>(null);
    const [search, setSearch] = React.useState('')
    console.log(search)

    React.useEffect(() => {
        async function fetchRecipes() {
            const resp = await fetch("/api/recipes");
            const data = await resp.json();
            setRecipes(data);
        }
        fetchRecipes();
    }, []);

    console.log("Here are all the tips we have fetched:");
    console.log(recipes);


    function handleChange(e: any) {
        setSearch(e.currentTarget.value)
    }

    function filterResults() {
        return recipes?.filter(searchResult => {
            return searchResult.name.toLowerCase().includes(search.toLowerCase()) ||
                searchResult.cuisine.toLowerCase().includes(search.toLowerCase()) ||
                searchResult.total_time.toLowerCase().includes(search.toLowerCase())
        })
    }

    if (!recipes) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }

    // TODO: Add Tailwind/CSS to this
    return (
        <section>
            <div className="container mx-auto">
                <div className="flex justify-center mt-8 ">
                    <input
                        id="searchBar"
                        className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-96"
                        placeholder="Search for Advice"
                        onChange={handleChange}
                        value={search}
                    />
                </div>
            </div>
            <div className="">
                {filterResults()?.length === 0 ? (
                    <div className="text-center mt-4 text-gray-500">No results match your search</div>
                ) : (
                    <div className="flex flex-wrap -mx-2 p-4">
                        {filterResults()?.map((recipe) => {
                            return (
                                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2">
                                    <Card key={recipe._id} {...recipe} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default RecipesList;
