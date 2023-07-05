import React, { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());  // Save the current time in state

    // Update the time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Clear interval on unmount
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            {time.toLocaleTimeString()}
        </div>
    );
}

export default Clock;
