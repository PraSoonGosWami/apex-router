import React, { createContext, useState, useLayoutEffect } from "react";
import { createBrowserHistory } from "history";
import { match } from "path-to-regexp";
import propTypes from "prop-types";
import { compilePath } from "./Utils";

export const history = createBrowserHistory();
export const RouterContext = createContext();

const Router = ({ routes = [], children }) => {
  const [matched, setMatched] = useState([]);
  useLayoutEffect(() => {
    let unlisten = history.listen(handleRouteChange);
    return () => {
      unlisten();
    };
  }, []);
  useLayoutEffect(() => {
    mathcPath(history.location.pathname);
  }, [routes]);

  const mathcPath = (pathname) => {
    const matchedRoutes = [];
    for (let i = 0; i < routes.length; i++) {
      const { path, exact = false } = routes[i];
      if (!path) return;
      const { regexp, keys } = compilePath(path, { end: exact });
      const matched = regexp.exec(pathname);
      if (matched) {
        const [url, ...values] = matched;
        const isExact = pathname === url;
        const routeProps = {
          url,
          history,
          location: history.location,
          params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
          }, {}),
          query: history.location.search,
          isExact,
          ...routes[i],
        };
        matchedRoutes.push(routeProps);
        if (exact) break;
      }
    }
    setMatched(matchedRoutes);
  };

  const handleRouteChange = (history) => {
    mathcPath(history.location.pathname);
  };

  return (
    <RouterContext.Provider value={{ matched }}>
      {children}
    </RouterContext.Provider>
  );
};

Router.propTypes = {
  routes: propTypes.arrayOf(propTypes.object),
};

export default Router;
