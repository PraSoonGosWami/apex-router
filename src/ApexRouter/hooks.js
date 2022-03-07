import { useContext } from "react";
import { RouterContext, history } from "./Router";

export const useRouter = () => {
  const { matched } = useContext(RouterContext);
  if (!matched.length) return null;
  const { component, render, ...routeProps } = matched[matched.length - 1];
  return { ...routeProps };
};
export const useHistory = () => history;
export const useLocation = () => history.location;
export const useQuery = () => history.location.search || null;
export const useParams = () => {
  const { matched } = useContext(RouterContext);
  if (!matched.length) return null;
  return matched[matched.length - 1].params;
};
