import React from "react";
import Random from "./Random";
export const UserChild = (props) => {
  console.log("User Child", props);
  return (
    <div>
      <h2>User Child</h2>
      <Random parent="User Child" />
    </div>
  );
};

export const UserChildID = (props) => {
  console.log("UserChildID", props);
  return (
    <div>
      <h2>SETTINGS ID {props.params.settingsId}</h2>
      <Random parent="User Settings" />
    </div>
  );
};
const UserSettings = (props) => {
  console.log("User", props);
  return (
    <div>
      <h2>UserSettings</h2>
      <Random parent="User" />
    </div>
  );
};

export default UserSettings;
