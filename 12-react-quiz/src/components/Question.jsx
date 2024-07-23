import { useContext, useEffect} from 'react';
import Option from './Option';
import { QuizContext } from '../store/quiz-context';
import TimerBar from './timerBar';
import TIMERMAP from '../timerMap.js';


const TIMER = 6000;


export default function Question({ q }) {
        const { currentQuestionIdx, answerSelected, answerCorrect, showQuestionResult, showNextQuestion, updateUserSkipQuestion } = useContext(QuizContext);

        // Shuffle the options only on the 1st render when no answer has been selected
        let questionOptions = q.options;
        if (answerSelected === null) {
                questionOptions.sort(() => Math.random() - 0.5);
        }


        // Phase A timer needs a useEffect because we want to clear the timer when answerSelected
        useEffect(() => {
                // The timeout duration is same as the progress bar timer so they're both in sync
                if (answerSelected === null && answerCorrect === null) {
                        let timerA = setTimeout(() => {
                                if (!answerSelected) {
                                        updateUserSkipQuestion();
                                }
                        }, TIMERMAP.phaseA.duration);

                        return () => {
                                clearTimeout(timerA);
                        };
                }
        }, [currentQuestionIdx, answerSelected])
        // The phase A timer should clear once when the answer is selected and again when the next question is presented

        // Phase B. The timeout duration is same as the progress bar timer so they're both in sync
        if (answerSelected !== null && answerCorrect === null) {
                let timerB = setTimeout(() => {
                        showQuestionResult(q.id);
                }, TIMERMAP.phaseB.duration)
        }

        // Phase C. The timeout duration is same as the progress bar timer so they're both in sync
        if (answerSelected !== null && answerCorrect !== null) {
                let timerC = setTimeout(() => {
                        // show next question and reset answerSelected and answerCorrect
                        showNextQuestion();

                }, TIMERMAP.phaseC.duration)
        }

        return (
                <div id='quiz'>
                        <div id='question'>
                                <TimerBar timer={TIMER} />
                                <h2>{q.text}</h2>
                                <section>
                                        <ul id='answers'>
                                                {questionOptions.map((option) => <Option opt={option} questionID={q.id}
                                                // onSelect={updateUserResponse}
                                                // answerSelected={answerSelected}
                                                />)}
                                        </ul>

                                </section>

                        </div>
                </div>

        )
}