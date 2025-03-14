import { useContext } from 'react';


import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartItem from './CartItem.jsx';
import Modal from './UI/Modal';
import { CartContext } from '../store/FoodCartContext.jsx';
import {UserProgressContext} from '../store/UserProgressContext.jsx';



export default function Cart() {
        const { items, addFoodToCart, removeFoodFromCart } = useContext(CartContext);
        const userProgressCtx = useContext(UserProgressContext);

        const cartTotal = items.reduce(
                (totalPrice, item) => totalPrice + item.quantity * item.price,
                0
        );

        return (
                <Modal open={userProgressCtx.progress === userProgressCtx.cartState} 
                className='modal cart'>
                        <h2>Your Cart</h2>
                                <ul>
                                        {
                                                items.map((item) => <CartItem
                                                        key={item.id}
                                                        item={item}
                                                        addItem={addFoodToCart}
                                                        removeItem={removeFoodFromCart} />
                                                )
                                        }
                                </ul>

                                <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
                                <div className="modal-actions">
                                        <Button textOnly onClick={userProgressCtx.hideCart}>Close</Button>
                                        <Button onClick={userProgressCtx.showCheckout} disabled={cartTotal === 0}>Go to Checkout</Button>
                                </div>
                </Modal>
        )
};