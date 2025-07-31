import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import IsAuthenticated from '../services/Auth/IsAuthenticated.js';

export default function PublicRoute({children}) {
    const [isAuth, setIsAuth] = useState(null); // null = loading

    useEffect(() => {
        const checkAuth = async () => {
            const valid = await IsAuthenticated();
            setIsAuth(valid);
        };
        checkAuth();
    }, []);

    if (isAuth === null) return null;

    return isAuth ? <Navigate to="/home"/> : children;
}
