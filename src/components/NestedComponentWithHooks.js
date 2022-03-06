import { useHistory, useRouter } from "ApexRouter";
import React from "react";

const NestedComponentWithHooks = () => {
  const properties = useRouter();
  console.log(properties);
  return (
    <div>
      <h1>Nested Component with hooks</h1>
    </div>
  );
};

export default NestedComponentWithHooks;
