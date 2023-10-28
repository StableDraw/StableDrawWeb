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
        path:'/drawing-to-img',
        requireAuth:true,
        element: <DrawingMobx/>
    },

    {
        path:'/aboutus',
        requireAuth:true,
        element: <AbtoutUs1/>
    },
    {
        path:'/test',
        requireAuth:true,
        element:<DrawingtoImg/>
    },
    {
        path:'/drawing-to-img-oldv',
        requireAuth:true,
        element: <Drawing/>
    },
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
