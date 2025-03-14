import { useContext } from 'react';

import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import { CartContext } from '../store/FoodCartContext.jsx';


export default function Food({ meal }) {
        const { addFoodToCart } = useContext(CartContext);

        function handleAddFoodToCart() {
                addFoodToCart(meal)
        }

        return (
                <li className="meal-item">
                        <article>
                                <img src={`http://localhost:3000/${meal.image}`} />
                                <div>
                                        <h3>{meal.name}</h3>
                                        <p className="meal-item-price">
                                                {currencyFormatter.format(meal.price)}
                                        </p>
                                        <p className="meal-item-description">{meal.description}</p>
                                </div>
                                <p className="meal-item-actions">
                                        <Button onClick={handleAddFoodToCart}>Add to Cart</Button>
                                </p>
                        </article>
                </li>
        );
}