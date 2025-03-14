import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';


const backendURL = 'https://react-redux-backend-13e32-default-rtdb.firebaseio.com';

// Writing our own action creator
// Action creators are used to create and return action objects
// In fact, the action object that Redux dispatch recieves is also created by a built-in Redux toolkit action creator
// This action creator will return a function (which is also considered an object)

export const fetchCartData = () => {
        // action-creators returns this function which Redux will execute when the action-creator is called via dispatch
        return async (dispatch) => {

                // fetchData func
                const fetchData = async () => {
                        const response = await fetch(
                                backendURL + '/cart.json'
                        );

                        if (!response.ok) {
                                throw new Error('Could not fetch cart data!');
                        }

                        const data = await response.json();

                        return data;
                };

                // 1. Fetch data from backend
                try {
                        const cartData = await fetchData();
                        dispatch(
                                // replace cart data with the data from backend
                                cartActions.replaceCart({
                                        items: cartData.items || [],
                                        totalQuantity: cartData.totalQuantity,
                                })
                        );
                } catch (error) {
                        dispatch(
                                uiActions.showNotification({
                                        status: 'error',
                                        title: 'Error!',
                                        message: 'Fetching cart data failed!',
                                })
                        );
                }
        };
};

export const sendCartData = (cart) => {
        // When redux dispatches action-creators, it will automatically pass the dispatch as arguement
        return async (dispatch) => {
                // 1) show the sending... notification
                dispatch(
                        uiActions.showNotification({
                                status: 'pending',
                                title: 'Sending...',
                                message: 'Sending cart data!',
                        })
                );

                const sendRequest = async () => {
                        const response = await fetch(
                                backendURL + '/cart.json',
                                {
                                        method: 'PUT',
                                        body: JSON.stringify({
                                                items: cart.items,
                                                totalQuantity: cart.totalQuantity,
                                        }),
                                }
                        );

                        if (!response.ok) {
                                throw new Error('Sending cart data failed.');
                        }
                };
                
                // 2) send the data to backend API and show success notification
                try {
                        await sendRequest();

                        dispatch(
                                uiActions.showNotification({
                                        status: 'success',
                                        title: 'Success!',
                                        message: 'Sent cart data successfully!',
                                })
                        );
                } catch (error) {
                        dispatch(
                                uiActions.showNotification({
                                        status: 'error',
                                        title: 'Error!',
                                        message: 'Sending cart data failed!',
                                })
                        );
                }
        };
};