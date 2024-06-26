import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';


// If we want to pass ref from one component to anorther, we must wrap the component with forwardRef
const ResultModal = forwardRef(function ResultModal({ result, targetTime, remainingTime, onReset }, ref) {
        const dialog = useRef();

        const userLost = remainingTime <= 0;
        const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
        // When we click stop, the closer we are to targetTime, the highter the score
        const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

        // This allows an external component to use the showModal function
        // We use useImperativeHandle because its best of keep all DOM related functions/actions in the component that has the DOM
        // Lets say if we were to call the showModal() outside of this component, and in the future the <dialog> is changed to
        // div, then the showModal action would break because its an action for dialog modals
        // Doing useImperativeHandle lets us define the DOM function/action here so if we ever change the dialog to div, 
        // we can re-write the open() function differently
        useImperativeHandle(ref, () => {
                return {
                        open() {
                                dialog.current.showModal();
                        }
                };
        });


        // createPortal outputs the JSX code at the target DOM instead of where the TimerChallenge is located
        // createPortal(JSX code, target DOM)
        // In this case we want the dialog modal to be rendered in <div id="modal"></div> in index.html
        // Reason is we want the modal to have better accessibility and position over the whole page
        // It can also help avoid styling problems.
        return createPortal(
                <dialog ref={dialog} className="result-modal" onClose={onReset}>
                        {userLost && <h2>You lost</h2>}
                        {!userLost && <h2>Your Score: {score}</h2>}
                        <p>
                                The target time was <strong>{targetTime} seconds.</strong>
                        </p>
                        <p>
                                You stopped the timer with{' '}
                                <strong>{formattedRemainingTime} seconds left.</strong>
                        </p>
                        {/* form method="dialog" is native html. This causes the modal to automatically close when button is clicked.
                            Check MDN docs */}
                        <form method="dialog" onSubmit={onReset}>
                                <button>Close</button>
                        </form>
                </dialog>,
                document.getElementById('modal')
        );
});

export default ResultModal;