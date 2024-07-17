import { useRef, useState } from 'react';
import Option from './Option';


export default function Question({ q }) {
        // const btnRef = useRef(); 
        console.log("q: ", q);
        const [answerSelected, setAnswerSelected] = useState(false);

        function handleOnSelect() {
                setAnswerSelected(true);
        }

        return (
                <div id='quiz'>
                        <div id='question'>
                                <h2>{q.text}</h2>
                                <section>
                                        <ul id='answers'>
                                                {q.options.map((option) => <Option opt={option}
                                                        onSelect={handleOnSelect}
                                                        answerSelected={answerSelected} />)}
                                        </ul>

                                </section>

                        </div>
                </div>

        )
}