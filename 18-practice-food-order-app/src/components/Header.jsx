import { useContext } from 'react';

import headerImg from '../assets/logo.jpg'
import Button from './UI/Button.jsx';
import { CartContext } from '../store/FoodCartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';



export default function Header() {
        const { items } = useContext(CartContext);
        const userProgressCtx  = useContext(UserProgressContext);

        // get count of all items
        let cartItemCount = items.reduce(
                (total, item) => total + item.quantity, 0
        );

        return (
                <>
                        <header id="main-header">
                                <div id="title">
                                        <img src={headerImg} alt="food menu logo" />
                                        <h1>Food App</h1>
                                </div>
                                <nav>
                                        <Button textOnly onClick={userProgressCtx.showCart}>Cart ({cartItemCount})</Button>
                                </nav>
                        </header>
                </>

        );
}