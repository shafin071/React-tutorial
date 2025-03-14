import { useContext } from 'react';

import Button from './UI/Button.jsx';
import Modal from './UI/Modal';
import { CartContext } from '../store/FoodCartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';



export default function OrderSuccess() {
        const { clearCart } = useContext(CartContext);
        const { progress, hideCheckout, orderSuccess } = useContext(UserProgressContext);

        function handleFinish() {
                hideCheckout();
                clearCart();
        }

        return (
                <Modal open={progress === orderSuccess}>
                        <h2>Success!</h2>
                        <p>Your order was submitted successfully.</p>
                        <p>
                                We will get back to you with more details via email within the next
                                few minutes.
                        </p>
                        <p className="modal-actions">
                                <Button onClick={handleFinish}>Okay</Button>
                        </p>
                </Modal>
        )
}