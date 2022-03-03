import React from "react";

const Settings = (props) => {
  console.log("Settings", props);

  return (
    <div>
      <h2>Settings</h2>
      {JSON.stringify(props.config, null, 4)}
    </div>
  );
};

export default Settings;
