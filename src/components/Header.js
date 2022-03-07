import { useRouter, withRouter } from "ApexRouter";
import React from "react";

const Header = (props) => {
  const current = useRouter();

  return (
    <div>
      <h1>Header</h1>
      <h2>Role: {current?.roles}</h2>
      <hr />
    </div>
  );
};

export default Header;
