import React, { createContext } from "react";
import { createBrowserHistory } from "history";
import propTypes from "prop-types";
import { compilePath } from "./Utils";
import { Component } from "react/cjs/react.production.min";

export const history = createBrowserHistory();
export const RouterContext = createContext();

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = { matched: [] };
    if (
      this.props.routes &&
      this.props.routes instanceof Array &&
      this.props.routes.length
    ) {
      this.unlisten = history.listen(this.handleRouteChange);
      this.__default = this.props.routes.find((route) => route.default) || {
        path: this.props.routes[0].path,
      };
      this.__404 = this.props.routes.find((route) => route.name === "404");
    }
  }

  componentDidMount() {
    if (
      this.props.routes &&
      this.props.routes instanceof Array &&
      this.props.routes.length
    )
      this.handleRouteChange(history);
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  matchPath = (pathname) => {
    const matchedRoutes = [];
    const { routes } = this.props;
    if (!routes) return;
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
      this.__404
        ? history.replace(this.__404.path)
        : history.replace(this.__default.path);
    } else {
      if (this.handleBeforeLoad(matchedRoutes) === false) return;
      if (this.handleBeforeUnload(this.state.matched) === false) return;
      this.setState({ matched: matchedRoutes });
    }
  };

  handleRouteChange = (history) => {
    this.matchPath(history.location.pathname);
  };

  handleBeforeLoad = (mRoutes) => {
    if (!mRoutes.length) return;
    const cur = mRoutes[mRoutes.length - 1];
    if (cur.beforeLoad && cur.beforeLoad instanceof Function)
      return cur.beforeLoad();
  };
  handleBeforeUnload = (cRoutes) => {
    if (!cRoutes.length) return;
    const cur = cRoutes[cRoutes.length - 1];
    if (cur.beforeUnload && cur.beforeUnload instanceof Function)
      return cur.beforeUnload();
  };
  render() {
    return (
      <RouterContext.Provider value={{ matched: this.state.matched }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

Router.propTypes = {
  routes: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Router;
