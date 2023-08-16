import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Design } from "./components/Design";
import { TexttoImg } from "./components/TexttoImg";
import { DrawingtoImg } from "./components/DrawingtoImg";
import  Drawing  from './components/Drawing'
import { PhototoImg } from "./components/PhototoImg";
import { FramestoAnimation } from "./components/FramestoAnimation";
//import { RefreshAuthorization } from "./components/api-authorization/RefreshAuthorization";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { MainBabylon } from "./components/babylon/mainBabylon";
import { App1 } from "./components/testUI/App1";
import Pay from './components/Pay';
import AgreementWindow from './components/AgreementWindow';


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
        element: <Drawing/>
    },
    {
        path: '/notdrawing-to-img',
        requireAuth: false,
        element: <App1 />
    },
    {
        path: '/test',
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
        requireAuth: false,
        element: <FetchData />
    },
    {
        path: '/Pay',
        requireAuth: false,
        element: <Pay/>
    },
    {
        path: '/babylon',
        requireAuth: false,
        element: <MainBabylon />
    },
    {
        path: '/AgreementWindow',
        requireAuth: false,
        element: <AgreementWindow/>
    },
    ...ApiAuthorzationRoutes,
    // {
    //     path: '/api',
    //     requireAuth: false,
    //     element: Proxy
    // }
];

export default AppRoutes;
