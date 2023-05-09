import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Design } from "./components/Design";
import { TexttoImg } from "./components/TexttoImg";
import { DrawingtoImg } from "./components/DrawingtoImg";
import { PhototoImg } from "./components/PhototoImg";
import { FramestoAnimation } from "./components/FramestoAnimation";
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
        path: '/text-to-img',
        requireAuth: true,
        element: <TexttoImg />
    },
  {
      path: '/drawing-to-img',
      requireAuth: true,
      element: <DrawingtoImg />
    },
    {
        path: '/photo-to-img',
        requireAuth: true,
        element: <PhototoImg />
    },
    {
        path: '/frames-to-animation',
        requireAuth: true,
        element: <FramestoAnimation />
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
