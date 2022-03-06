import React from "react";
import NestedComponentWithHooks from "./NestedComponentWithHooks";

const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <NestedComponentWithHooks />
    </div>
  );
};

export default Home;
