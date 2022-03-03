import { pathToRegexp } from "path-to-regexp";

const flatenRoutes = (routeConfig, routes) => {
  if (!routeConfig || routeConfig.length <= 0) return;
  routeConfig.forEach((route) => {
    const { children, ...rest } = route;
    routes.push({ ...rest });
    if (children && children.length > 0) flatenRoutes(children, routes);
  });
};

const compilePath = (path, options) => {
  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  return result;
};

const constructRoutes = (routeConfig) => {
  const routes = [];
  flatenRoutes(routeConfig, routes);
  return routes;
};

export { constructRoutes, compilePath };
