import Home from "./components/Home";
import Dashboard from "components/Dashboard";
import Profile from "components/Profile";
import Posts from "components/Posts";
import Post from "components/Post";

const routeConfig = [
  {
    name: "home", //required
    title: "Home",
    path: "/",
    exact: true,
    component: Home,
    beforeLoad: () => {
      console.log("Loading HOME");
    },
    beforeUnload: () => {
      console.log("Unloading HOME");
    },
    roles: ["Admin"],
    hidden: true,
  },
  {
    name: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    exact: true,
    beforeUnload: () => {
      console.log("Unloading Dashboard");
      //return false;
    },
    component: Dashboard,
    roles: ["QA"],
    hidden: false,
    features: ["showDatePicker"],
  },
  {
    name: "profile",
    title: "Profile",
    path: "/profile",
    default: true,
    exact: true,
    component: Profile,
    roles: ["Packer"],
    hidden: false,
    features: ["showDatePicker"],
  },
  {
    name: "posts",
    title: "Posts",
    path: "/posts",
    exact: true,
    component: Posts,
    roles: ["Techops"],
    hidden: false,
    features: ["showDatePicker"],
    children: [
      {
        name: "anotherpost",
        path: "/posts/solid",
        exact: true,
        render: () => <h2>ANother post</h2>,
        roles: ["QA"],
        hidden: false,
        features: ["showDatePicker"],
      },
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
