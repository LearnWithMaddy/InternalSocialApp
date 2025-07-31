import {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import IsAuthenticated from "../services/Auth/IsAuthenticated.js";

export default function PrivateRoute() {
    const [isAuth, setIsAuth] = useState(null); // null = loading

    useEffect(() => {
        const checkAuth = async () => {
            const valid = await IsAuthenticated();
            setIsAuth(valid);
        };
        checkAuth();
    }, []);

    if (isAuth === null) {
        // You can show a loading spinner here if you want
        return null;
    }

    return isAuth ? <Outlet/> : <Navigate to="/login"/>;
}
