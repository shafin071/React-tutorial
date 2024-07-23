import { createContext, useState, useReducer } from 'react';
import QUESTIONBANK from '../question.js';


export const QuizContext = createContext({
        currentQuestionIdx: 0,
        answerSelected: null,
        answerCorrect: null,
        answers: [],
        updateUserSelectOption: () => { },
        updateUserSkipQuestion: () => { },
        showQuestionResult: () => { },
        showNextQuestion: () => { }
});


function evaluateAnswer(qidx, optionID) {
        let answerCorrect = false
        // let question = QUESTIONBANK.filter((question) => question.id === questionID)
        let question = QUESTIONBANK[qidx]
        if (question.length === 1) {
                if (question[0].answer === optionID) {
                        answerCorrect = true;
                } else {
                        answerCorrect = false;
                }
        }
        return answerCorrect;
}


// applies action on state
function quizReducer(state, action) {

        // When modifying a state, always copy the state. In this case {...state} makes a deep copy
        const updatedState = { ...state };

        if (action.type === 'OPTION_SELECTED') {
                let optionID = action.payload.id
                updatedState.answerSelected = optionID
        }

        if (action.type === 'QUESTION_SKIPPED') {
                updatedState.answerSelected = null;
                updatedState.answerCorrect = null;
                if (updatedState.currentQuestionIdx <= QUESTIONBANK.length - 1) {
                        let answerObj = {
                                qid: QUESTIONBANK[updatedState.currentQuestionIdx].id,
                                answerId: null,
                                correct: null,
                               skipped: true
                        }
                        updatedState.answers.push(answerObj)
                }
                updatedState.currentQuestionIdx += 1;
        }

        if (action.type === 'EVALUATE_ANSWER') {
                let optionID = state.answerSelected
                let answerCorrect = evaluateAnswer(updatedState.currentQuestionIdx, optionID);
                updatedState.answerCorrect = answerCorrect;
                let answerObj = {
                        qid: QUESTIONBANK[updatedState.currentQuestionIdx].id,
                        answerId: optionID,
                        correct: answerCorrect,
                        skipped: false
                }
                updatedState.answers.push(answerObj)

        }

        if (action.type === 'NEXT_QUESTION') {
                updatedState.answerSelected = null;
                updatedState.answerCorrect = null;
                updatedState.currentQuestionIdx += 1;
        }

        return updatedState;

}

// Handles all the functions that updates the state. These functions will dispatch the action to the reducer
// Returns the context as component
export default function QuizContextProvider({ children }) {
        const [responseState, quizResponseDispatch] = useReducer(
                quizReducer,
                {
                        currentQuestionIdx: 0,
                        answerSelected: null,
                        answerCorrect: null,
                        answers: [],
                }
        );

        function handleUserSelectOption(optionID) {
                // Takes the user's selected answer, dispatches the action where ther answer ID is saved in state
                quizResponseDispatch({
                        // these goes for action
                        type: 'OPTION_SELECTED',
                        payload: {
                                id: optionID
                        }
                })
        }

        function handleUserSkipQuestion() {
                quizResponseDispatch({
                        // these goes for action
                        type: 'QUESTION_SKIPPED',
                        payload: {}
                })
        }

        function handleQuestionResult() {
                // Dispatches the action where the answer is evaluated and result in saved in state
                quizResponseDispatch({
                        type: 'EVALUATE_ANSWER',
                        payload: {}
                })
        }

        function handleNextQuestion() {
                quizResponseDispatch({
                        type: 'NEXT_QUESTION',
                        payload: {}
                })
        }

        const ctxValue = {
                currentQuestionIdx: responseState.currentQuestionIdx,
                answerSelected: responseState.answerSelected,
                answerCorrect: responseState.answerCorrect,
                answers: responseState.answers,
                updateUserSelectOption: handleUserSelectOption,
                updateUserSkipQuestion: handleUserSkipQuestion,
                showQuestionResult: handleQuestionResult,
                showNextQuestion: handleNextQuestion
        };

        return <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>

}


