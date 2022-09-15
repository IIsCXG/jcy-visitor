import { Navigate } from 'react-router';
import Login from '../component/Login';
import Registered from '../component/Registered'
import Layout from '../component/Layout';
import M from '../component/Layout/M';
import Home from '../component/Layout/Home';
import Echarts from '../component/Layout/Echarts';

const router = [
    { path: '/', element: <Navigate to="/Login" /> },
    { path: '/login', element: <Login /> },
    { path: '/registered', element: <Registered /> },
    {
        path: '/layout', element: <Layout />, children: [
            { path: 'home', element: <Home /> },
            { path: 'm', element: <M /> },
            { path: 'echarts', element: <Echarts /> },
            { path: '/layout', element: <Navigate to="home" /> },

        ]
    },

]
export default router