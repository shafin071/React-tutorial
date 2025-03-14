import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

import classes from './Counter.module.css';

const Counter = () => {
        // useSelector is a hook in the React Redux library that allows you to extract data from the Redux store state
        // The useSelector hook takes a selector function as its argument.
        // The selector function receives the entire Redux store state as its only parameter and returns the specific piece of data you need from it.
        // Below, state => state.counter is an arrow function which is executed by Redux and it returns the counter from the store.
        // The arrow function will always excute when there is a change in the counter state and return the latest counter.
        // So this component is subscribed to this counter state.
        // when the component unmounts, (removed from DOM) Redux will automatically clear the subscription for you.
        const counter = useSelector(state => state.counter.counter);
        const show = useSelector((state) => state.counter.showCounter);

        // useDispatch returns a function that can be executed to execute an action against the Redux store.
        const dispatch = useDispatch();

        const incrementHandler = () => {
                dispatch(counterActions.increment());
        };

        const increaseHandler = () => {
                // Here we pass the payload to counterActions.increase
                // The input arg 'action' for this method in a built in Redux object that looks like this: 
                // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
                dispatch(counterActions.increase(10)); 
        };

        const decrementHandler = () => {
                dispatch(counterActions.decrement());
        };

        const toggleCounterHandler = () => {
                dispatch(counterActions.toggleCounter());
        };


        return (
                <main className={classes.counter}>
                        <h1>Redux Counter</h1>
                        {show && <div className={classes.value}>{counter}</div>}
                        <div>
                                <button onClick={incrementHandler}>Increment</button>
                                <button onClick={increaseHandler}>Increase by 10</button>
                                <button onClick={decrementHandler}>Decrement</button>
                        </div>
                        <button onClick={toggleCounterHandler}>Toggle Counter</button>
                </main>
        );
};

export default Counter;



// Below is a classed-based component version of Counter:

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' }),
//   }
// };

// REMEMBER: hooks like useSelector and useDispatch are not usable in class-based components.
// Hence we subscribe a component to Redux using the connect function.
// connect() takes these 2 functions are args which will be executed by Redux

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);