import { withRouter } from "ApexRouter";
import React from "react";

const Random = (props) => {
  console.log("RANDOM", props.parent, props);

  return <div>I am Random from {props.parent}</div>;
};

export default withRouter(Random);
