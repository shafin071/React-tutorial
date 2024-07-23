import { useContext } from 'react';

import QUESTIONBANK from "../question";
import Question from './Question.jsx';
import { QuizContext } from '../store/quiz-context';
// import QuizContextProvider from '../store/quiz-context.jsx';
import ResultSummary from './ResultSummary.jsx';


export default function Quiz() {
        const { currentQuestionIdx } = useContext(QuizContext);

        let currentQuestion = QUESTIONBANK[currentQuestionIdx];

        return (
                <>
                {(currentQuestion) ? <Question q={currentQuestion} /> : <ResultSummary/>}
                </>

        )
}