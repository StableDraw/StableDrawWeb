import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { DrawingtoImg } from "./components/DrawingtoImg";
import  Drawing  from './components/Drawing'
//import { RefreshAuthorization } from "./components/api-authorization/RefreshAuthorization";
import { Home } from "./components/Home";
import { MainBabylon } from "./components/babylon/mainBabylon";
import {App1} from "./components/testUI/App1";
// import Pay from './components/Pay'; 
import {Pay} from './components/UI/PayNew/PayNew'
import GenerateBtn from './components/UI/GenerateWindow/GenerateBtn/GenerateBtn'; 
import { StartPage } from './components/UI/startPage/startPage';
import GenerateWindowMobx from './components/UI/GenerateWindiwMobx/GenerateBtn/GenerateBtn'
import AboutUs from './components/UI/AboutUs/AboutUs'
const AppRoutes = [
    {
        index: true,
        element: <StartPage />
    },
    {
        path:'/mobx',
        requireAuth:true,
        element: <GenerateWindowMobx/>
    },
    {
        path:'/aboutUs',
        requireAuth:true,
        element: <AboutUs/>
    },
    {
        path: '/window',
        requireAuth: true,
        element: <GenerateBtn />
    },
    {
        path: '/drawing-to-img',
        requireAuth: true,
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
    // {
    //     path: '/authentication/refresh-authorization',
    //     requireAuth: true,
    //     element: <RefreshAuthorization />
    // },
    {
        path: '/Pay',
        requireAuth: false,
        element: <Pay/>
    },
    {
        path: '/babylon',
        requireAuth: true,
        element: <MainBabylon />
    },
    {
        path: '/api',
        requireAuth: true,
        element: Proxy
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
