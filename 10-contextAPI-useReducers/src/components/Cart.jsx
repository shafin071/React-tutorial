import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";


export default function Cart() {
        // by { items } we are destructuring the object in CartContext. It'll only return the items array
        // NOTE: a component will be re-executed if there is a change in context
        const { items, updateItemQuantity } = useContext(CartContext);
        console.log('items in Cart: ', items)


        // reduce executes a function for array element and returns the accumulated result
        // for ex: [1,2,3].reduce(add function) = 6
        const totalPrice = items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
        );
        const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

        return (
                <div id="cart">
                        {items.length === 0 && <p>No items in cart!</p>}
                        {items.length > 0 && (
                                <ul id="cart-items">
                                        {items.map((item) => {
                                                const formattedPrice = `$${item.price.toFixed(2)}`;

                                                return (
                                                        <li key={item.id}>
                                                                <div>
                                                                        <span>{item.name}</span>
                                                                        <span> ({formattedPrice})</span>
                                                                </div>
                                                                <div className="cart-item-actions">
                                                                        <button onClick={() => updateItemQuantity(item.id, -1)}>
                                                                                -
                                                                        </button>
                                                                        <span>{item.quantity}</span>
                                                                        <button onClick={() => updateItemQuantity(item.id, 1)}>
                                                                                +
                                                                        </button>
                                                                </div>
                                                        </li>
                                                );
                                        })}
                                </ul>
                        )}
                        <p id="cart-total-price">
                                Cart Total: <strong>{formattedTotalPrice}</strong>
                        </p>
                </div>
        );
}
