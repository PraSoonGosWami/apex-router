import { constructRoutes, Link, Router, Routes } from "ApexRouter";
import routeConfig from "./routeConfig";

const routes = constructRoutes(routeConfig);

function App() {
  return (
    <Router routes={routes}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/settings/apple">Apple</Link>
          </li>
          <li>
            <Link to="/settings/apple/child">Child</Link>
          </li>
        </ul>
      </nav>
      <Routes />
    </Router>
  );
}

export default App;
