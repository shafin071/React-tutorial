import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';


const cartSlice = createSlice({
        name: 'cart',
        initialState: {
                items: [],
                totalQuantity: 0,
                changed: false,   // this field is used to check if cart data needs to be snt on page load. See App.jsx
        },
        reducers: {
                replaceCart(state, action) {
                        state.totalQuantity = action.payload.totalQuantity;
                        state.items = action.payload.items;
                },

                addItemToCart(state, action) {
                        // For synchronous side-effect free code, its better to do the data transformation logic 
                        // (the stuff that happens before overwriting the state like finding the cart item or increasing the item quantity etc. ) 
                        // in reducers. Avoid doing it in action creators or components.

                        // However for async code that has sife effect like calling an endpoint, its recommended to NOT do
                        // the data transformation logic in reducers.
                        // Instead put the logic in action creators or components. 
                        // In that case, reducers are only used to receive the payload and overwrite the state

                        const newItem = action.payload;
                        // data transformation
                        const existingItem = state.items.find((item) => item.id === newItem.id);
                        state.totalQuantity++;
                        state.changed = true;

                        if (!existingItem) {
                                // overwrite state
                                state.items.push({
                                        id: newItem.id,
                                        price: newItem.price,
                                        quantity: 1,
                                        totalPrice: newItem.price,
                                        name: newItem.title
                                });
                        } else {
                                // data transformation
                                existingItem.quantity++;
                                // overwrite state
                                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                        }
                },
                removeItemFromCart(state, action) {
                        const id = action.payload;
                        const existingItem = state.items.find(item => item.id === id);
                        state.totalQuantity--;
                        state.changed = true;

                        if (existingItem.quantity === 1) {
                                state.items = state.items.filter(item => item.id !== id);
                        } else {
                                existingItem.quantity--;
                                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
                        }
                },
        },
});


export const cartActions = cartSlice.actions;

export default cartSlice;