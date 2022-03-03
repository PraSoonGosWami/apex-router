import Home from "./components/Home";
import Settings from "./components/Settings";
import UserSettings, {
  UserChild,
  UserChildID,
} from "./components/UserSettings";

const routeConfig = [
  {
    name: "home", //required
    path: "/", //required
    exact: true,
    component: Home, //required or render
    roles: ["Admin"],
    hidden: true,
  },
  {
    name: "settings",
    path: "/settings",
    exact: true,
    component: Settings,
    default: true,
    roles: ["QA"],
    hidden: false,
    features: ["showDatePicker"],
    children: [
      {
        name: "userSettings",
        path: "/settings/apple",
        exact: true,
        component: UserSettings,
        roles: ["Sup"],
        hidden: false,
        children: [
          {
            name: "userChild",
            path: "/settings/apple/child",
            exact: true,
            component: UserChild,
            roles: ["Techops"],
            hidden: true,
          },
        ],
      },
      {
        name: "userChildId",
        path: "/settings/:settingsId",
        exact: true,
        component: UserChildID,
        roles: ["Sup"],
        hidden: false,
      },
    ],
  },
  {
    name: "404", //required
    render: () => <div>NOT FOUND</div>, //required or render
  },
];

export default routeConfig;
