import { currencyFormatter } from '../util/formatting.js';


export default function CartItem({ item, addItem, removeItem }) {
        return (
                <li className="cart-item">
                        <p>
                                {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
                        </p>
                        <p className="cart-item-actions">
                                <button onClick={() => removeItem(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => addItem(item)}>+</button>
                        </p>
                </li>
        );
}