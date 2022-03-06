import { pathToRegexp } from "path-to-regexp";

const __flatenRoutes = (routeConfig, routes) => {
  if (!routeConfig || routeConfig.length <= 0) return;
  routeConfig.forEach((route) => {
    if (!route.name)
      throw new Error("'name' is a required property in route config");
    const { children, ...rest } = route;
    if (rest.path && (rest.component || rest.render)) routes.push({ ...rest });
    if (children && children.length > 0) __flatenRoutes(children, routes);
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
  __flatenRoutes(routeConfig, routes);
  return routes;
};

export { constructRoutes, compilePath };
