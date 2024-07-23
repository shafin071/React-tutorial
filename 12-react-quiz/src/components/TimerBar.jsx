import { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../store/quiz-context';
import TIMERMAP from '../timerMap.js';


export default function TimerBar({ timer }) {
        /**
         * The TimerBar runs 3 times per question.
         *      A: When the question is shown and the user is given time to select an answer.
         *          Color of the progress bar should be the default purple.
         
         *      B: When answer is selected, the timer runs again to give the user some time to see what answer they chose. 
         *          This timer should run down quickly. Color of the progress bar should be yellow.
         
         *      C: When the answer result is shown i.e. the chosen answer is highlighten green (if correct) or red (if incorrent).
         *          This timer should run down quickly as well. Color of the progress bar should be the default purple.
         */

        const [remainingTime, setRemainingTime] = useState(timer);
        const [runResultViewTimer, setRunResultViewTimer] = useState(false);
        const { currentQuestionIdx, answerSelected, answerCorrect } = useContext(QuizContext);

        let timerDecrement = 10
        let decrementA = TIMERMAP.phaseA.decrement;
        let decrementB = TIMERMAP.phaseB.decrement;
        timerDecrement = (answerSelected && !runResultViewTimer) ? decrementB : decrementA;

        // Set the className for the prgressBar for phase B
        let progressBarClass = (answerSelected && answerCorrect === null) ? 'answered' : null;

        function handleTimerExpired() {
                if (answerSelected) {
                        // When timer for phase B runs out, show if chosen answer is correct/incorrect and run the timer for phase C
                        setRunResultViewTimer(true);

                } else if (answerSelected && runResultViewTimer) {
                        // When the timer for phase C runs out, go to next question

                } else {
                        // When timer for phase A runs out,record answer as skipped and go to next question
                }
        }

        useEffect(() => {
                const interval = setInterval(() => {
                        setRemainingTime((prevTime) => {
                                let remainingTime = prevTime - timerDecrement
                                return remainingTime
                        });
                }, decrementA);

                // cleanup func will run when the dependency changes
                return () => {
                        clearInterval(interval);
                        setRemainingTime(timer)
                };
        }, [currentQuestionIdx, answerSelected, answerCorrect]);
        // Run the cleanup/CB func when either answerSelected or runResultViewTimer value changes.
        // what's interesting is that even though the cleanup/cb func will fire on the latest state/variable change
        // if you were to use the state/variable inside the return function, it'll hold the value of the previous render.
        // Ex: cleanup func fires when answerSelected goes false -> true during [hase B], but inside cleanup func answerSelected will still be false (from phase A)
        //      The next time cleanup func fires (for phase C]), you'll see answerSelected is true.

        return <progress className={progressBarClass} value={remainingTime} max={timer} />;

}