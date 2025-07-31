import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/home/Home';
import News from '../pages/news/News';
import PostDetails from '../pages/postDetail/PostDetails';
import PrivateRoute from './PrivateRoute.jsx';
import InitialRedirect from "./BaseRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import BaseNavLayout from "../layout/BaseNavLayout.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                    <PublicRoute><Login/></PublicRoute>
                }/>
                <Route path="/register" element={
                    <PublicRoute><Register/></PublicRoute>
                }/>

                {/* Protected Routes */}

                <Route element={<PrivateRoute/>}>

                    <Route element={<BaseNavLayout/>}>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/news/:id" element={<PostDetails/>}/>
                    </Route>
                </Route>

                {/* Smart root redirect only for `/` */}
                <Route path="/" element={<InitialRedirect/>}/>

                {/* 404 fallback */}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </BrowserRouter>

    );
}
