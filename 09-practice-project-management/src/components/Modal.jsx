import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';


const Modal = forwardRef( function Modal({ children, ...props }, ref) {
        const dialog = useRef();

        useImperativeHandle(ref, () => {
                return {
                        open() {
                                dialog.current.showModal();
                        },
                };
        });

        return createPortal(
                <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" 
                {...props}>
                        {children}
                </dialog>,
                document.getElementById('modal-root')
        );
}); 

export default Modal;