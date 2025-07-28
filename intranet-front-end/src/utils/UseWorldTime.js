// src/utils/UseWorldTime.js
import {useState, useEffect} from 'react';

export default function useWorldTime(offset) {
    const [time, setTime] = useState(getTime(offset));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime(offset));
        }, 1000);
        return () => clearInterval(interval);
    }, [offset]);

    return time;
}

function getTime(offset) {
    const utc = new Date(new Date().toUTCString().substr(0, 25));
    return new Date(utc.getTime() + offset * 3600 * 1000);
}
