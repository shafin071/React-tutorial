import { createContext, useState, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';


// Notice that we are passing an object in createContext
export const CartContext = createContext({
        items: [],
        addItemToCart: () => { },
        updateItemQuantity: () => { },
});


// this func is defined outside of the context provider function
// because we don't want to this function to execute everytime the component function executes
// Also it doesn't need direct access to the props inside the context provider func
// the reducer func should accept a (state, action) because this func will be called once the reducer dispatch is called
// the state will be the latest snashot of the state managed by useReducer
function shoppingCartReducer(state, action) {
        if (action.type === 'ADD_ITEM') {
                const updatedItems = [...state.items];

                const existingCartItemIndex = updatedItems.findIndex(
                        (cartItem) => cartItem.id === action.payload
                );
                const existingCartItem = updatedItems[existingCartItemIndex];

                if (existingCartItem) {
                        const updatedItem = {
                                ...existingCartItem,
                                quantity: existingCartItem.quantity + 1,
                        };
                        updatedItems[existingCartItemIndex] = updatedItem;
                } else {
                        const product = DUMMY_PRODUCTS.find(
                                (product) => product.id === action.payload
                        );
                        updatedItems.push({
                                id: action.payload,
                                name: product.title,
                                price: product.price,
                                quantity: 1,
                        });
                }

                return {
                        ...state, // not needed here because we have only one value
                        items: updatedItems,
                };
        }

        if (action.type === 'UPDATE_ITEM') {
                const updatedItems = [...state.items];
                const updatedItemIndex = updatedItems.findIndex(
                        (item) => item.id === action.payload.productId
                );

                const updatedItem = {
                        ...updatedItems[updatedItemIndex],
                };

                updatedItem.quantity += action.payload.amount;

                if (updatedItem.quantity <= 0) {
                        updatedItems.splice(updatedItemIndex, 1);
                } else {
                        updatedItems[updatedItemIndex] = updatedItem;
                }

                return {
                        ...state,
                        items: updatedItems,
                };
        }
        return state;
}


// This context manages the cart state
// These functions were originally in App.jsx but got moved in here to make App.jsx leaner
// This is used a wrapping component. 
// All the components inside this context provider wrapper will be able to access the CartContext 
export default function CartContextProvider({ children }) {

        // useReducer is another state management hook similar to useState
        // We can use this to avoid the arrow function pattern of always updating state based on the previous state
        // dispatch function is an action handled by the reducer to create a new state
        // the shoppingCartState can now be used instead of the shoppingCart state
        const [shoppingCartState, shoppingCartDispatch] = useReducer(
                shoppingCartReducer,   // register this reducer function as the dispatch action
                {
                        items: [],  // initial state of the reducer
                }
        );

        // const [shoppingCart, setShoppingCart] = useState({
        //         items: [],
        // });

        function handleAddItemToCart(id) {
                // the object inside dispatch is passed to shoppingCartReducer as action
                shoppingCartDispatch({
                        type: 'ADD_ITEM',
                        payload: id,
                });
        }

        function handleUpdateCartItemQuantity(productId, amount) {
                shoppingCartDispatch({
                        type: 'UPDATE_ITEM',
                        payload: {
                                productId,
                                amount
                        }
                });
        }

        const ctxValue = {
                items: shoppingCartState.items,
                addItemToCart: handleAddItemToCart,
                updateItemQuantity: handleUpdateCartItemQuantity,
        };

        // Provider is a CartContext property. The default value here is required, otherwise you'll see an error in console
        // Setting the default value to ctxValue defined above. This is how we link the context to state
        return <CartContext.Provider value={ctxValue}>
                {children}
        </CartContext.Provider>
}