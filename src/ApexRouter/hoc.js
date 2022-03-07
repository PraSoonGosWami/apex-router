import propTypes from "prop-types";
import { RouterContext } from "./Router";

export const withRouter = (Component) => {
  return (props) => {
    return (
      <RouterContext.Consumer>
        {({ matched }) => {
          if (matched.length) {
            const { component, render, ...routeProps } =
              matched[matched.length - 1];
            return <Component {...props} {...routeProps} />;
          }
          return <Component {...props} />;
        }}
      </RouterContext.Consumer>
    );
  };
};

withRouter.propTypes = {
  Component: propTypes.elementType,
};
