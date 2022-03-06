import Home from "./components/Home";
import Dashboard from "components/Dashboard";
import Profile from "components/Profile";
import Posts from "components/Posts";
import Post from "components/Post";

const routeConfig = [
  {
    name: "home", //required
    path: "/", //required
    exact: true,
    default: true,
    component: Home, //required or render
    roles: ["Admin"],
    hidden: true,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    roles: ["QA"],
    hidden: false,
    features: ["showDatePicker"],
  },
  {
    name: "profile",
    path: "/profile",
    exact: true,
    component: Profile,
    roles: ["QA"],
    hidden: false,
    features: ["showDatePicker"],
  },
  {
    name: "posts",
    path: "/posts",
    component: Posts,
    roles: ["QA"],
    exact: true,
    hidden: false,
    features: ["showDatePicker"],
    children: [
      {
        name: "post",
        path: "/posts/:postid",
        exact: true,
        component: Post,
        roles: ["QA"],
        hidden: false,
        features: ["showDatePicker"],
      },
    ],
  },
  {
    name: "404",
    path: "/not-found",
    render: () => <h1>Page Not Found</h1>,
  },
];

export default routeConfig;
