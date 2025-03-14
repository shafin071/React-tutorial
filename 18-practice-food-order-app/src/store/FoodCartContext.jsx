import { createContext, useReducer } from 'react';


export const CartContext = createContext({
        items: [],
        addFoodToCart: (item) => { },
        removeFoodFromCart: (item) => { },
        clearCart: () => { }
});


function foodCartReducer(state, action) {
        if (action.type === 'ADD_ITEM') {
                const updatedItems = [...state.items];

                const existingCartItemIndex = updatedItems.findIndex(
                        (cartItem) => cartItem.id === action.payload.id
                );
                const existingCartItem = updatedItems[existingCartItemIndex];

                if (existingCartItem) {
                        const updatedItem = {
                                ...existingCartItem,
                                quantity: existingCartItem.quantity + 1,
                        };
                        updatedItems[existingCartItemIndex] = updatedItem;
                } else {
                        updatedItems.push({ ...action.payload, quantity: 1 })
                }

                return {
                        ...state, // not needed here because we have only one value
                        items: updatedItems,
                }
        }

        if (action.type === 'REMOVE_ITEM') {
                const updatedItems = [...state.items];
                const existingCartItemIndex = updatedItems.findIndex(
                        (cartItem) => cartItem.id === action.payload.id
                );
                const existingCartItem = updatedItems[existingCartItemIndex];

                // if item quantity is 1, removing it will make quantity 0, 
                // hence remove the item from the cart
                if (existingCartItem.quantity === 1) {
                        updatedItems.splice(existingCartItemIndex, 1);
                } else {
                        const updatedItem = {
                                ...existingCartItem,
                                quantity: existingCartItem.quantity - 1,
                        };
                        updatedItems[existingCartItemIndex] = updatedItem;
                }

                return {
                        ...state, // not needed here because we have only one value
                        items: updatedItems,
                }
        }

        if (action.type === 'CLEAR_CART') {
                console.log("in clear cart dispatch");
                return { ...state, items: [] };
        }

        return state;
}


export default function CartContextProvider({ children }) {

        const [foodCartState, foodCartDispatch] = useReducer(
                foodCartReducer,   // register this reducer function as the dispatch action
                {
                        items: [],  // initial state of the reducer
                }
        );

        function handleAddFoodToCart(item) {
                // the object inside dispatch is passed to shoppingCartReducer as action
                foodCartDispatch({
                        type: 'ADD_ITEM',
                        payload: item,
                });
        }

        function handleRemoveFoodFromCart(item) {
                foodCartDispatch({
                        type: 'REMOVE_ITEM',
                        payload: item,
                });
        }

        function handleClearCart(item) {
                foodCartDispatch({
                        type: 'CLEAR_CART'
                });
        }

        const ctxValue = {
                items: foodCartState.items,
                addFoodToCart: handleAddFoodToCart,
                removeFoodFromCart: handleRemoveFoodFromCart,
                clearCart: handleClearCart,
        };

        // Provider is a CartContext property. The default value here is required, otherwise you'll see an error in console
        // Setting the default value to ctxValue defined above. This is how we link the context to state
        return <CartContext.Provider value={ctxValue}>
                {children}
        </CartContext.Provider>
}