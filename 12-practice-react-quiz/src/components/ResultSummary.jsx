import { useContext } from 'react';

import quizCompleteImg from '../assets/quiz-complete.png';
import { QuizContext } from '../store/quiz-context';
import QUESTIONBANK from "../question";


export default function ResultSummary() {
        const { answers } = useContext(QuizContext);

        let skipped = 0
        let correct = 0
        let incorrect = 0

        answers.map((answer) => {
                correct = (answer.correct) ? correct + 1 : correct;
                incorrect = (answer.correct === false) ? incorrect + 1 : incorrect;
                skipped = (answer.skipped) ? skipped + 1 : skipped;
        })

        const correctAnswers = Math.round((correct / answers.length) * 100);
        const incorrectAnswers = Math.round((incorrect / answers.length) * 100);
        const skippedAnswers = Math.round((skipped / answers.length) * 100);

        return (
                <div id="summary">
                        <img src={quizCompleteImg} alt="Trophy icon" />
                        <h2>Quiz Completed!</h2>

                        <div id="summary-stats">
                                <p>
                                        <span className="number">{skippedAnswers}%</span>
                                        <span className="text">skipped</span>
                                </p>
                                <p>
                                        <span className="number">{correctAnswers}%</span>
                                        <span className="text">answered correctly</span>
                                </p>
                                <p>
                                        <span className="number">{incorrectAnswers}%</span>
                                        <span className="text">answered incorrectly</span>
                                </p>
                        </div>

                        <ol>
                                {
                                        answers.map((answer, i) => {
                                                let cssClass = 'user-answer';

                                                if (answer.skipped) {
                                                        cssClass += ' skipped';
                                                } else if (answer === QUESTIONBANK[i].answer) {
                                                        cssClass += ' correct';
                                                } else {
                                                        cssClass += ' wrong';
                                                }

                                                let question = QUESTIONBANK[i];

                                                let userAnswer = question.options.filter((opt) => {
                                                        const [key, val] = Object.entries(opt)[0]
                                                        return key === answer.answerId
                                                })
                                                
                                                let answerText = null;
                                                if (userAnswer.length > 0) {
                                                        let answerId = answer.answerId
                                                        answerText = userAnswer[0][answerId]
                                                }

                                                return (
                                                        <li key={i}>
                                                                <h3>{i + 1}</h3>
                                                                <p className="question">{question.text}</p>
                                                                <p className={cssClass}>{answerText ?? 'Skipped'}</p>
                                                        </li>
                                                );
                                        })
                                }
                        </ol>


                </div>
        );
}