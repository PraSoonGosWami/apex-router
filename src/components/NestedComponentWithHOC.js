import { withRouter } from "ApexRouter";
import React from "react";

const NestedComponentWithHOC = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Nested Component With HOC</h1>
    </div>
  );
};

export default withRouter(NestedComponentWithHOC);
