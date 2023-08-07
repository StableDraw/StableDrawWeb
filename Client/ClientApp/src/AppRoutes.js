import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Design } from "./components/Design";
import { TexttoImg } from "./components/TexttoImg";
import { DrawingtoImg } from "./components/DrawingtoImg";
import { PhototoImg } from "./components/PhototoImg";
import { FramestoAnimation } from "./components/FramestoAnimation";
//import { RefreshAuthorization } from "./components/api-authorization/RefreshAuthorization";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { MainBabylon } from "./components/babylon/mainBabylon";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/design',
        requireAuth: true,
        element: <Design />
    },
    {
        path: '/text-to-img',
        requireAuth: true,
        element: <TexttoImg />
    },
    {
        path: '/drawing-to-img',
        requireAuth: false,
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
    /*
    {
        path: '/authentication/refresh-authorization',
        requireAuth: true,
        element: <RefreshAuthorization />
    },*/
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
    {
        path: '/babylon',
        requireAuth: false,
        element: <MainBabylon />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
