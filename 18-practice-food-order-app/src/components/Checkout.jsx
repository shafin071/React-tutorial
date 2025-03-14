import { useContext } from 'react';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import Input from './UI/Input.jsx';
import Modal from './UI/Modal';
import { CartContext } from '../store/FoodCartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import { postFoodOrder } from '../apiClient';


export default function Checkout() {
        const { items } = useContext(CartContext);
        const { progress, checkoutState, hideCheckout, showOrderSuccess } = useContext(UserProgressContext);
        const queryClient = useQueryClient();

        const cartTotal = items.reduce(
                (totalPrice, item) => totalPrice + item.quantity * item.price,
                0
        );

        const { mutate, isLoading } = useMutation({
                mutationFn: postFoodOrder, 
                onSuccess: data => {
                        hideCheckout();
                        console.log("success resp:", data);
                        showOrderSuccess();
                },
                onError: () => {
                        alert("there was an error")
                }
        });

function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        mutate({
                order: {
                        items: items,
                        customer: customerData,
                }
        })
}

return (
        <Modal open={progress === checkoutState}>
                <form onSubmit={handleSubmit}>
                        <h2>Checkout</h2>
                        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                        <Input label="Full Name" type="text" id="name" />
                        <Input label="E-Mail Address" type="email" id="email" />
                        <Input label="Street" type="text" id="street" />
                        <div className="control-row">
                                <Input label="Postal Code" type="text" id="postal-code" />
                                <Input label="City" type="text" id="city" />
                        </div>

                        <p className="modal-actions">
                                <Button type="button" textOnly onClick={hideCheckout}>
                                        Close
                                </Button>
                                <Button>Submit Order</Button>
                        </p>
                </form>
        </Modal >
)
};