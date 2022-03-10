import { useRouter, withRouter } from "ApexRouter";
import React from "react";

const Header = () => {
  const current = useRouter();
  return (
    <div>
      <h1>Header</h1>
      <h2>Role: {current?.roles.join(" | ")}</h2>
      <hr />
    </div>
  );
};

export default Header;
