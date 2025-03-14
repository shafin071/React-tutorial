import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };


// createSlice creates a slice of the global state
// different slices can have different pieces of the global state
const counterSlice = createSlice({
        name: 'counter',  // every slice needs a name
        initialState: initialCounterState,

        // notice some of these reducer methods don't need an action passed to it. 
        // because these methods will automatically be called for you depending on which action was triggered.
        // However, we can still pass action to the method if needed.

        // also notice, we are directly changing the state without copying it first. 
        // Its because Redux toolkit internally uses another package, called imgur, which will detect code like this 
        // and which will automatically clone the existing state, create a new state object, keep all the state
        // which we're not editing, and override the state which we are editing in an immutable way.
        reducers: {
                increment(state) {
                        state.counter++;
                },
                decrement(state) {
                        state.counter--;
                },

                // increase counter by a user defined value
                // action is a Redux object that looks like this:
                // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
                increase(state, action) {
                        state.counter = state.counter + action.payload;
                },
                toggleCounter(state) {
                        state.showCounter = !state.showCounter;
                },
        },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;