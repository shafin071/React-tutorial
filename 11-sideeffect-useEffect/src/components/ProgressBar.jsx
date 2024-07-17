import { useState, useEffect } from 'react';


export default function ProgressBar({ timer }) {
        const [remainingTime, setRemainingTime] = useState(timer);

        // console.log("progressBar executing...");

        // setInterval func executes after a set time period
        useEffect(() => {
                const interval = setInterval(() => {
                        console.log('INTERVAL');
                        setRemainingTime((prevTime) => prevTime - 10);
                }, 10);

                // cleanup func
                return () => {
                        clearInterval(interval);
                };
        }, []);

        return <progress value={remainingTime} max={timer} />;
}