import { constructRoutes, Link, Router, Routes } from "ApexRouter";
import Header from "components/Header";
import routeConfig from "./routeConfig";

const routes = constructRoutes(routeConfig);

function App() {
  return (
    <Router routes={routes}>
      <nav>
        <ul>
          {routeConfig.map((r) => {
            if (r.beforeLoad) r.beforeLoad.bind(null, "Special Props");
            return (
              <li key={r.name}>
                <Link to={r.path}>{r.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
