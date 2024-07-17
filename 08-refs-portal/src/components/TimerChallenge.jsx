import { useState, useRef } from 'react';
import ResultModal from './ResultModal';



export default function TimerChallenge({ title, targetTime }) {
        // this timer ref will be component specific
        // Meaning other instances of TimerChallenge will have their own timer
        // Ref is not reset when the component re-renders
        // The timer ref here is not a DOM selector, instead it's just a varaible that holds time value in seconds
        // Timer is a ref and not a state because we don't always want to re-render the component as the timer value changes.
        // The value of the timer is set in handleStart
        const timer = useRef();
        const dialog = useRef();

        const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
        const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;  // evaluated everytime component is re-executed

        // If no time remianing, open dialog modal
        if (timeRemaining <= 0) {
                console.log("timer when time is up: ", timer.current);
                clearInterval(timer.current);  // tell the browser to stop the repeated execution of setInterval
                dialog.current.open();
        }

        // reset the time remaining in TimerChallenge
        function handleReset() {
                setTimeRemaining(targetTime * 1000);
        }

        // When start button is clicked
        function handleStart() {
                console.log("timer: ", timer.current);
                // setInterval is a built-in browser function
                timer.current = setInterval(() => {
                        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);   // this re-executes the component
                }, 10);
        }

        // When stop button is clicked
        function handleStop() {
                dialog.current.open();  // dialog.current is the model DOM selector inside ResultModal
                clearInterval(timer.current);  // clearInterval is a built-in browser function
        }

        return (
                <>
                        <ResultModal
                                ref={dialog}
                                targetTime={targetTime}
                                remainingTime={timeRemaining}
                                onReset={handleReset}
                        />
                        <section className="challenge">
                                <h2>{title}</h2>
                                <p className="challenge-time">
                                        {targetTime} second{targetTime > 1 ? 's' : ''}
                                </p>
                                <p>
                                        <button onClick={timerIsActive ? handleStop : handleStart}>
                                                {timerIsActive ? 'Stop' : 'Start'} Challenge
                                        </button>
                                </p>
                                <p className={timerIsActive ? 'active' : undefined}>
                                        {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                                </p>
                        </section>
                </>
        );
}