import propTypes from "prop-types";
import { RouterContext } from "./Router";

export const withRouter = (Component) => {
  return (props) => {
    return (
      <RouterContext.Consumer>
        {({ matched }) => {
          const { component, render, ...routeProps } =
            matched[matched.length - 1];
          return <Component {...props} {...routeProps} />;
        }}
      </RouterContext.Consumer>
    );
  };
};

withRouter.propTypes = {
  Component: propTypes.elementType,
};
