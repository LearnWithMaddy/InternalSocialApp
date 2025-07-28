// src/routes/Index.jsx
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/home/Home';
import AuthLayout from '../layout/AuthLayout';
import News from '../pages/news/News';
import PostDetails from '../pages/postDetail/PostDetails';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                {/* Protected Routes under layout */}
                <Route element={<AuthLayout/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/news/:id" element={<PostDetails/>}/>
                </Route>

                {/* Redirect to /home by default for now */}
                <Route path="*" element={<Navigate to="/home"/>}/>
            </Routes>
        </BrowserRouter>
    );
}
