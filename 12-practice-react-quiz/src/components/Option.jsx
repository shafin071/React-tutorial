import { useContext, useRef } from 'react';
import { QuizContext } from '../store/quiz-context';


export default function Option({ opt, questionID }) {
        const { answerSelected, answerCorrect, updateUserSelectOption } = useContext(QuizContext);
        const btnRef = useRef();
        const [key, val] = Object.entries(opt)[0]

        let btnClass = null;
        if (answerSelected === key) {
                btnClass = 'selected';
                // if answer has been evaludated, then highlight the option green or red
                if (answerCorrect !== null) {
                        btnClass = (answerCorrect) ? 'correct' : 'wrong';
                }
        }

        let btnDisabled = (answerSelected !== null)

        function handleSelect() {
                updateUserSelectOption(btnRef.current.id);
        }

        return (
                <li key={key} className='answer'>
                        <button ref={btnRef} id={key} onClick={handleSelect} className={btnClass} disabled={btnDisabled}>
                                {val}
                        </button>
                </li>
        )
}