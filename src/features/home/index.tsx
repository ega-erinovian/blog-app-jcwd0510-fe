import React from "react";
import Jumbotron from "./components/Jumbotron";
import BlogList from "./components/BlogList";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Jumbotron />
      <BlogList />
    </div>
  );
};

export default HomePage;
