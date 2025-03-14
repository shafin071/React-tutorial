import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';


let isInitial = true;


function App() {
        const showCart = useSelector((state) => state.ui.cartIsVisible);
        const dispatch = useDispatch();
        const cart = useSelector((state) => state.cart);
        const notification = useSelector((state) => state.ui.notification);

        // On first page load, fetch the cart data from backend
        // fetchCartData isa an action-creator
        useEffect(() => {
                dispatch(fetchCartData());
        }, [dispatch]);


        // Get the latest cart state and update backend
        // This step can also be in productItem.jsx instead but Max decided to put it in the root component.
        // because productItem dispatches the action to update cart first
        // Then the updated cart triggers the useEffect to call backend in App.jsx

        // This useEffect will run once the page is first loaded and then everytime the cart changes
        // If its the first time load (where isInitial is true), then set it to false and exit because when this component loads
        // the first time, there is no cart data to send as the cart is empty.
        useEffect(() => {
                console.log("running useEffect");
                if (isInitial) {
                        isInitial = false;
                        return;
                }

                // Send data to backend only if cart changed
                // This if statement makes sure sendCartData sends data to backend ONLY when the cart state updates.
                // See addItemToCart and removeItemFromCart on how the cart.change is set
                if (cart.changed) {

                        // Remember: to use aysnc inside useEffect, you have to put it in a function
                        // sendCartData is an action-creator and it uses async to make the API calls.
                        // action-creators are reusable code that can be used in multiple components.
                        // The great thing about Redux, when using Redux toolkit, is that it does not just accept action objects
                        // with a type property. Instead it also does accept, action creators that return functions.
                        // Redux dispatch will execute the function returned by the action-creator and it passes the dispatch argument
                        dispatch(sendCartData(cart));
                }

        }, [cart, dispatch]);
        // The useEffect will run the very first the page is loaded
        // After that it will run everytime either one or both of the dependencies change.
        // Why is dispatch added a depedency?
        // Because it is a variable (func object) that is defined outside of the scope of the useEffect callback, but is used inside a function body of a component.  
        // Therefore, we should include it in the dependency array.  That is the rule of the useEffect dependency array.
        // Remember: since dispatch is a React hook, it is guarantred that the function will never change. Its just added due to the rule explained above.

        return (
                <Fragment>
                        {notification && (
                                <Notification
                                        status={notification.status}
                                        title={notification.title}
                                        message={notification.message}
                                />
                        )}
                        <Layout>
                                {showCart && <Cart />}
                                <Products />
                        </Layout>
                </Fragment>
        );
}

export default App;