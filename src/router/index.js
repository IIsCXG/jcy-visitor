import { Navigate } from 'react-router';
import Login from '../component/Login';
import Registered from '../component/Registered'
import Layout from '../component/Layout';
import M from '../component/Layout/M';
import Home from '../component/Layout/Home';
import Hello from '../component/Layout/Hello';
import Visitor from '../component/Layout/Visitor';
import { AuthComponent } from './Auth.js'
const router = [
    { path: '/', element: <Navigate to="/Login" /> },
    { path: '/login', element: <Login /> },
    { path: '/registered', element: <Registered /> },
    {
        path: '/layout', element: <AuthComponent > <Layout /></AuthComponent>, children: [
            { path: 'home', element: <Home /> },
            { path: 'm', element: <M /> },
            { path: 'Hello', element: <Hello /> },
            { path: 'visitor', element: <Visitor /> },
            { path: '/layout', element: <Navigate to="home" /> },

        ]
    },

]
export default router