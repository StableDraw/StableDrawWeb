import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { DrawingtoImg } from "./components/DrawingtoImg";
import  Drawing  from './components/Drawing'
import { MainBabylon } from "./components/babylon/mainBabylon";
import {Pay} from './components/UI/PayNew/PayNew'
import { StartPage } from './components/UI/startPage/startPage';
import DrawingMobx from './components/DrawingMobx';
import AbtoutUs1 from './components//UI/AboutUs1/AboutUs1';
import Regisration from './components/UI/Registration/Registration.tsx';
import Authentication from './components/UI/Auth/Auth.tsx';
import ResultWindow from './components/UI/ResultWindow/ResultWindow';
import GenerateWindow from '../src/components/UI/GenerateWindiwMobx/GenerateBtn/GenerateBtn.jsx'
const AppRoutes = [
    {
        index: true,
        element: <StartPage />
    },
    {
        path:'/drawing-to-img',
        requireAuth:false,
        element: <DrawingMobx/>
    },
    {
        path:'/aboutus',
        requireAuth:false,
        element: <AbtoutUs1/>
    },
    {
        path:'/result',
        requireAuth:true,
        element: <ResultWindow/>
    },
    {
        path:'/registration',
        requireAuth:true,
        element: <Regisration/>
    },
    {
        path:'/auth',
        requireAuth:true,
        element: <Authentication/>
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
