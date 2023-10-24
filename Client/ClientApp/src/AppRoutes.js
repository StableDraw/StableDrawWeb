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
import LableBar from './components/UI/LableBarMobx/LableBar';
import DrawingMobx from './components/DrawingMobx'
import AbtoutUs1 from './components//UI/AboutUs1/AboutUs1'
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
        path:'/aboutus1',
        requireAuth:true,
        element: <AbtoutUs1/>
    },
    {
        path:'/drawing-to-img-mobx',
        requireAuth:true,
        element: <DrawingMobx/>
    },
    {
        path:'/lablebar',
        requireAuth:true,
        element: <LableBar/>
    },
    {
        path:'/aboutus',
        requireAuth:true,
        element: <AbtoutUs1/>
    },
    {
        path:'/drawing-to-img-mobx',
        requireAuth:true,
        element: <DrawingMobx/>
    },
    {
        path:'/lablebar',
        requireAuth:true,
        element: <LableBar/>
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
