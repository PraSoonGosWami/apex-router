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
    handleRouteChange(history);
  }, [routes]);

  const matchPath = (pathname) => {
    const matchedRoutes = [];
    for (let i = 0; i < routes.length; i++) {
      const { path, exact = false } = routes[i];
      const { regexp, keys } = compilePath(path, { end: exact });
      const match = regexp.exec(pathname);
      if (match) {
        const [url, ...values] = match;
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
      else history.replace(routes[0].path);
    } else {
      handleBeforeLoad(matchedRoutes);
      setMatched((prevState) => {
        handleBeforeUnload(prevState);
        return matchedRoutes;
      });
    }
  };

  const handleRouteChange = (history) => {
    matchPath(history.location.pathname);
  };

  const handleBeforeLoad = (mRoutes) => {
    if (!mRoutes.length) return;
    const cur = mRoutes[mRoutes.length - 1];
    if (cur.beforeLoad && cur.beforeLoad instanceof Function) cur.beforeLoad();
  };
  const handleBeforeUnload = (cRoutes) => {
    if (!cRoutes.length) return;
    const cur = cRoutes[cRoutes.length - 1];
    if (cur.beforeUnload && cur.beforeUnload instanceof Function)
      cur.beforeUnload();
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
