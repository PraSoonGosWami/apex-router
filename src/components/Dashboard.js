import React from "react";
import NestedComponentWithHOC from "./NestedComponentWithHOC";
import NestedComponentWithHooks from "./NestedComponentWithHooks";

const Dashboard = (props) => {
  console.log("DASHBOARD RENDERED");
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
