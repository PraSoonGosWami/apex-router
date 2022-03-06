import React, { createContext, useState, useLayoutEffect } from "react";
import { createBrowserHistory } from "history";
import propTypes from "prop-types";
import { compilePath } from "./Utils";

export const history = createBrowserHistory();
export const RouterContext = createContext();

const Router = ({ routes = [], children }) => {
  const [matched, setMatched] = useState([]);
  let __default;
  let __404;

  useLayoutEffect(() => {
    let unlisten = history.listen(handleRouteChange);
    return () => {
      unlisten();
    };
  }, []);

  useLayoutEffect(() => {
    __default = routes.find((route) => route.default);
    __404 = routes.find((route) => route.name === "404");
    matchPath(history.location.pathname);
  }, [routes]);

  const matchPath = (pathname) => {
    const matchedRoutes = [];
    for (let i = 0; i < routes.length; i++) {
      const { path, exact = false } = routes[i];
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
        if (exact && isExact) break;
      }
    }
    if (!matchedRoutes.length) {
      if (__404) history.replace(__404.path);
      else if (__default) history.replace(__default.path);
    } else setMatched(matchedRoutes);
  };

  const handleRouteChange = (history) => {
    matchPath(history.location.pathname);
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
