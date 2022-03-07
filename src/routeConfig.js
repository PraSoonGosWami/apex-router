import Home from "./components/Home";
import Dashboard from "components/Dashboard";
import Profile from "components/Profile";
import Posts from "components/Posts";
import Post from "components/Post";

const routeConfig = [
  {
    name: "home", //required
    path: "/",
    exact: true,
    component: Home,
    beforeLoad: () => {
      console.log("Loading HOME");
    },
    beforeUnload: () => console.log("Unloading HOME"),
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
    roles: ["Packer"],
    hidden: false,
    features: ["showDatePicker"],
  },
  {
    name: "posts",
    path: "/posts",
    component: Posts,
    roles: ["Techops"],
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
];

export default routeConfig;
