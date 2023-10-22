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
import {App1} from "./components/testUI/App1";
import Pay from './components/Pay';
import GenerateBtn from './components/UI/GenerateWindow/GenerateBtn/GenerateBtn';
import Editor from "./components/videoredactor/Video_Editor/Editor";
import VideoEditor from "./components/videoredactor/Video_Editor/VideoEditor"; 

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
        path: '/window',
        requireAuth: true,
        element: <GenerateBtn />
    },
    {
        path: '/text-to-img',
        requireAuth: true,
        element: <TexttoImg />
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
        path: '/video-editor',
        requireAuth: false,
        element: <VideoEditor />
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
