import { useEffect } from 'react';
import ProgressBar from './ProgressBar.jsx';


const TIMER = 3000;


export default function DeleteConfirmation({ onConfirm, onCancel }) {
        console.log("DeleteConfirmation executing")

        // This feature is added to demonstrate example for useEffect. When we delete a place, this modal will pop-up
        // Then after 3 seconds we want the modal to close and the place to get deleted via onConfirm func.
        // useEffect can help clean up the timer after the modal has closed.
        useEffect(() => {
                console.log('TIMER SET');
                const timer = setTimeout(() => {
                        onConfirm();
                }, TIMER);

                // This func will run right before useEffect runs again OR right before this component dismounts
                // So it'll act as the cleanup func and clear the timer before the modal is removed from the DOM.
                // This prevents the deletion of the place when we click No on the modal
                return () => {
                        console.log('Cleaning up timer');
                        clearTimeout(timer);
                };
        }, [onConfirm]);
        // Beware of adding functions like onConfirm as the dependency for useEffect
        // A function just like an object, also has a memory address and two identical functions are never the same
        // As onConfirm removes a place from the state, it causes App to re-render. Then inside App the handleRemovePlace
        // func is created and passed down to this component. However, this time the onConfirm has a different address than 
        // the last one, so it'll cause useEffect to run the codeblock again, which can lead to a loop.

        return (
                <div id="delete-confirmation">
                        <h2>Are you sure?</h2>
                        <p>Do you really want to remove this place?</p>
                        <div id="confirmation-actions">
                                <button onClick={onCancel} className="button-text">
                                        No
                                </button>
                                <button onClick={onConfirm} className="button">
                                        Yes
                                </button>
                        </div>
                        <ProgressBar timer={TIMER} />
                </div>
        );
}