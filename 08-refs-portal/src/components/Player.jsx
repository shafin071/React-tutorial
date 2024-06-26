import { useState, useRef } from 'react';



export default function Player() {
        // Refs are objects which is similar to a DOM selector in jQuery
        // It can simplify use cases where we need to save an input value to a state OR manipulate DOM
        // It removes the need for a seperate state that tracks the submission state of the submit button
        // WARNING: only use Refs for simple scenarios like getting/clearing input value.
        //                   We should always let react state handle DOM interactions

        // We may wonder why use state at all in this case, we can just use Ref to grab the input field value and update
        // the welcome player header. There are a few problems with that...
        // 1) you cannot set an initial value to Ref, so playerName will always be undefined on 1st page load, so you'll get an error
        // 2) updating a Ref does not automatically re-render the component DOM like updating a state
        const playerName = useRef();
        const [enteredPlayerName, setEnteredPlayerName] = useState('');

        // function handleChange(event) {
        //         setSubmitted(false);
        //         setEnteredPlayerName(event.target.value);
        // }

        function handleClick() {
                setEnteredPlayerName(playerName.current.value);
                playerName.current.value = '';
        }

        return (
                <section id="player">
                        <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
                        <p>
                                <input ref={playerName}
                                        type="text"
                                />
                                <button onClick={handleClick}>Set Name</button>
                        </p>
                </section>
        );
}
