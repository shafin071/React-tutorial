import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
        const dialog = useRef();

        // useEffect can be used because the  Modal component needs to be rendered first
        // for the code-block to understand what dialog is
        // At initial Modal execution before the JSX with the dialogue is rendered, 
        // const dialog = useRef(); is basically undefined
        useEffect(() => {
                if (open) {
                        dialog.current.showModal();
                } else {
                        dialog.current.close();
                }
        }, [open]);
        // REMEMBER useEffect will only execute its effect function again if the dependency value has changed.
        // So it'll only execute when the open (bool) prop has changed

        return createPortal(
                <dialog className="modal" ref={dialog} onClose={onClose}>
                        {open ? children : null}
                </dialog>,
                document.getElementById('modal')
        );
}

export default Modal;
