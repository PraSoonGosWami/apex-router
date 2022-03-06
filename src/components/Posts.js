import { Link } from "ApexRouter";
import React from "react";

const Posts = (props) => {
  return (
    <div>
      <h1>Posts</h1>
      <Link to="/posts/build-a-router">
        Navigate to build-a-router post using Router Link component
      </Link>
      <br /> <br />
      <button onClick={() => props.history.push("/posts/build-a-router")}>
        Navigate progammatically to build-a-router post
      </button>
    </div>
  );
};

export default Posts;
