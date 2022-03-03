import React, { useContext } from "react";
import { RouterContext } from "./Router";

const Routes = () => {
  const { matched } = useContext(RouterContext);
  const components = matched.map((r) => {
    const { component, render, ...routeProps } = r;
    if (component)
      return (
        <div key={routeProps.name}>
          {React.createElement(component, routeProps)}
        </div>
      );
    if (render) return <div key={routeProps.name}>{render(routeProps)}</div>;
    return null;
  });

  return <>{components} </>;
};

export default Routes;
