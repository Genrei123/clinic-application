import React, { useEffect, useState } from "react"

export const Clock: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const tick = () => {
            setCurrentTime(new Date());
        };
        const timerID = setInterval(tick, 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);


    return (
        <div className="text-white">
            {currentTime.toLocaleTimeString()}
        </div>
    );
}