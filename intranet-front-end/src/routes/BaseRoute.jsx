import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import IsAuthenticated from "../services/Auth/IsAuthenticated.js";

export default function InitialRedirect() {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const valid = await IsAuthenticated();
            console.log("Valid : ", valid)
            setIsAuth(valid);
            setAuthChecked(true);
        };
        checkAuth();
    }, []);

    if (!authChecked) return null; // Or a loading spinner

    return <Navigate to={isAuth ? '/home' : '/login'}/>;
}
