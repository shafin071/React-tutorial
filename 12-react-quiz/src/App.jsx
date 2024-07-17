import { useRef, useState, useEffect, useCallback } from 'react';

import QUESTIONBANK from "./question";
import Question from "./components/Question.jsx";


// Store question IDs in a const
// const QuestionBank = 

const userResponse = {
        correct: 0,
        skipped: 0,
        incorrect: 0
}

function App() {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [response, setResponse] = useState(userResponse);

        return (
                <Question q={QUESTIONBANK[currentQuestion]} />
        )

}

export default App;
