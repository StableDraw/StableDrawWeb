import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Design } from "./components/Design";
import { DrawingtoImg } from "./components/DrawingtoImg";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/design',
    element: <Design />
  },
  {
      path: '/drawing-to-img',
      requireAuth: true,
      element: <DrawingtoImg />
  },
  {
    path: '/counter',
    requireAuth: true,
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
