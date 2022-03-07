import { constructRoutes, Link, Router, Routes } from "ApexRouter";
import Header from "components/Header";
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
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
