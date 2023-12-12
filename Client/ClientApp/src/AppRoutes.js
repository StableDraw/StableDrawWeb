import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { DrawingtoImg } from "./components/DrawingtoImg";
import Drawing from './components/Drawing';
import { MainBabylon } from "./components/babylon/mainBabylon";
import { Pay } from './components/UI/PayNew/PayNew';
import { StartPage } from './components/UI/startPage/startPage';
import { UserProfile } from './components/UI/UserProfile/UserProfile.jsx';
import DrawingMobx from './components/DrawingMobx';
import AbtoutUs1 from './components//UI/AboutUs1/AboutUs1';
import Regisration from './components/UI/Registration/Registration.tsx';
import Auth from './components/UI/Auth/Auth.tsx';
import ResultWindow from './components/UI/ResultWindow/ResultWindow';
import GenerateWindow from '../src/components/UI/GenerateWindiwMobx/GenerateBtn/GenerateBtn.jsx'
const AppRoutes = [
	{
		index: true,
		element: <StartPage />
	},
    {
        path: '/adaptive-window',
        requireAuth: true,
		element: <GenerateWindow />
	},
	{
		path: '/drawing-to-img',
		requireAuth: true,
		element: <DrawingMobx />
	},
	{
		path: '/aboutus',
		requireAuth: false,
		element: <AbtoutUs1 />
	},
	{
		path: '/result',
		requireAuth: true,
		element: <ResultWindow />
	},
	{
		path: '/registration',
		requireAuth: true,
		element: <Regisration />
	},
	{
		path: '/auth',
		requireAuth: true,
		element: <Auth />
	},
	{
		path: '/test',
		requireAuth: true,
		element: <DrawingtoImg />
	},
	{
		path: '/drawing-to-img-oldv',
		requireAuth: true,
		element: <Drawing />
	},
	{
		path: '/Pay',
		requireAuth: false,
		element: <Pay />
	},
	{
		path: '/3d',
		requireAuth: true,
		element: <MainBabylon />
	},
	{
		path: '/myProfile',
		requireAuth: true,
		element: <UserProfile />
	},
	{
		path: '/api',
		requireAuth: true,
		element: Proxy
	},
	...ApiAuthorzationRoutes
];

export default AppRoutes;
