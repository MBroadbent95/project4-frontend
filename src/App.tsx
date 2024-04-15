import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RecipeList from "./components/RecipeList";
import CreateRecipe from "./components/CreateRecipe";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import ShowRecipe from "./components/ShowRecipe";
import EditRecipe from "./components/EditRecipe";
// import UserAccountInfo from "./components/UserAccountInfo";
import "./styles/index.css";
// import UserProfile from "./components/UserProfile";

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const resp = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(resp.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe" element={<RecipeList />} />
            <Route path="/recipe/:recipeId" element={<ShowRecipe user={user} />} />
            <Route path="/share-recipe" element={<CreateRecipe />} />
            <Route path="/login" element={<Login fetchUser={fetchUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recipe/edit/:recipeId" element={<EditRecipe />} />
            {/* <Route path="/user/:userId" element={<UserProfile />} /> */}
            {/*  we need to add in :userId */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;