import React from "react";

const Post = (props) => {
  return (
    <div>
      <h1>Single Post</h1>
      <h2>You are currenly viewing "{props.params.postid}"</h2>
    </div>
  );
};

export default Post;
