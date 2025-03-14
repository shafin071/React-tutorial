/** This is the older version of Redux store. The newer version has been done with  Redux-toolkit */

import { legacy_createStore as createStore } from 'redux'


/**
Why use Redux over React context-reducer combo.
- redux is the preferred approach for large apps as its a 3rd party store.
- React context setup and management can become complex. 
   You can end up with a lot of <contextProviderComponent> wrappers around your apps
- Redux has better performance than react context for high frequency state changes
 */

const initialState = { counter: 0, showCounter: true };


const counterReducer = (state = initialState, action) => {
        // NOTE: you should NEVER mutate the existing state, instead override the state and return it.
        // So we should not update the state like this: 
        // state.counter++
        // ALWAYS return a brand new object where you copy any nested objects 
        // and when returning a new state object, you must set all the state fields in it.
        // The reason has to do with the way JS objects/arrays reference to its primitive values
        // Its the same reason why we always make a copy of the existing state and update the copy.
        // https://academind.com/tutorials/reference-vs-primitive-values/

        if (action.type === 'increment') {

                // this is a brand new object
                // It also returns showCounter even though showCounter is not updated in this method. 
                // Otherwise showCounter will be undefined which is treated as false and you will see unexpected behavior in the components.
                return {
                        counter: state.counter + action.amount,
                        showCounter: state.showCounter
                };
        }

        if (action.type === 'increase') {
                return {
                        counter: state.counter + action.amount,
                        showCounter: state.showCounter
                };
        }

        if (action.type === 'decrement') {
                return {
                        counter: state.counter - action.amount,
                        showCounter: state.showCounter
                };
        }

        if (action.type === 'toggle') {
                // here you are getting the opposite of state.showCounter and storing it in showCounter
                return {
                        showCounter: !state.showCounter,
                        counter: state.counter
                };
        }

        return state;
};

const store = createStore(counterReducer);

export default store;   // This store needs to be provided to the App component in App.jsx, similar to the context provider