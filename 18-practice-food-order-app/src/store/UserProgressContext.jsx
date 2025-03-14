import { createContext, useState } from 'react';


const CART_STATE = 'cart';
const CHECKOUT_STATE = 'checkout';
const ORDER_SUCCESS_STATE = 'success'

export const UserProgressContext = createContext({
        progress: "",
        showCart: () => { },
        hideCart: () => { },
        showCheckout: () => { },
        hideCheckout: () => { },
        showOrderSuccess: () => { },
});


export default function UserProgressContextProvider({ children }) {
        const [userProgress, setUserProgress] = useState('');

        function handleShowCart() {
                setUserProgress(CART_STATE);
        }

        function handleHideCart() {
                setUserProgress("");
        }

        function handleShowCheckout() {
                setUserProgress(CHECKOUT_STATE);
        }

        function handleHideCheckout() {
                setUserProgress("");
        }

        function handleShowOrderSuccess() {
                setUserProgress(ORDER_SUCCESS_STATE);
        }

        const ctxValue = {
                progress: userProgress,
                cartState: CART_STATE,
                checkoutState: CHECKOUT_STATE,
                orderSuccess: ORDER_SUCCESS_STATE,
                showCart: handleShowCart,
                hideCart: handleHideCart,
                showCheckout: handleShowCheckout,
                hideCheckout: handleHideCheckout,
                showOrderSuccess: handleShowOrderSuccess,
        };

        return <UserProgressContext.Provider value={ctxValue}>
                {children}
        </UserProgressContext.Provider>
}
