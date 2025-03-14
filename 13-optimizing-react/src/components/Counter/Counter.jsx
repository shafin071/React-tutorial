import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import CounterHistory from './CounterHistory.jsx';
import { log } from '../../log.js';


function isPrime(number) {
        log(
                'Calculating if is prime number',
                2,
                'other'
        );
        if (number <= 1) {
                return false;
        }

        const limit = Math.sqrt(number);

        for (let i = 2; i <= limit; i++) {
                if (number % i === 0) {
                        return false;
                }
        }

        return true;
}

// Right now, a change in the input field in app component will cause the counter to re-render, which triggers the re-render
// of the entire component tree below it. This is where memo comes in.

// memo is like component caching. memo takes a look at the prop being to passed to the component
// it'll make the component re-execute only if the prop value changes in the parent (initialCount is a state in app component)
// memo doesn't interfere with any of the component's internal state changes
// Best practice is to use memo as high up in the component tree as possible, which in this case is the counter.

// Don't wrap all your child components with memo, because memo does a prop check going into the component 
// which also has cost in performance.

// Don't use it on components where you think the props will chagne frequently, 
// because then there is no point putting it in a memo
const Counter = memo(function Counter({ initialCount }) {
        log('<Counter /> rendered', 1);

        // useMemo is like memo, but for regular functions
        // prevents unnessecary execution of isPrime everytime Counter is executed but the isPrime prop value don't change
        // Note that useMemo is not smart like memo and it does not automatically know which prop value to check
        // Hence we add [initialCount] as the dependency, so everytime the value of initialCount changes, isPrime will be executed.
        // Just like memo, use userMemo with care ;)
        const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

        // useEffect can be used this way to reset the component. More explnation in App.
        // useEffect(() => {
        //   setCounterChanges([{ value: initialCount, id: Math.random() * 1000 }]);
        // }, [initialCount]);

        // const [counter, setCounter] = useState(initialCount);
        // counterChanges will now bean array of objects which holds the previous counts and a random id
        // usage of the id will be explained inApp and  CounterHistory
        const [counterChanges, setCounterChanges] = useState([
                { value: initialCount, id: Math.random() * 1000 },
        ]);

        console.log("counterChanges: ", counterChanges);


        const currentCounter = counterChanges.reduce(
                (prevCounter, counterChange) => prevCounter + counterChange.value,
                0
        );

        const handleDecrement = useCallback(function handleDecrement() {
                // setCounter((prevCounter) => prevCounter - 1);
                setCounterChanges((prevCounterChanges) => [
                        { value: -1, id: Math.random() * 1000 },
                        ...prevCounterChanges,
                ]);
        }, []);
        // the empty array is the dependency. The function will be recreated when this dependency changes.
        //  setCounter do not need to be in the dependency because its a state updating function and its (the func object)
        // guaranteed to never change unlike handleDecrement

        const handleIncrement = useCallback(function handleIncrement() {
                // setCounter((prevCounter) => prevCounter + 1);
                setCounterChanges((prevCounterChanges) => [
                        { value: 1, id: Math.random() * 1000 },
                        ...prevCounterChanges,
                ]);
        }, []);

        return (
                <section className="counter">
                        <p className="counter-info">
                                The initial counter value was <strong>{initialCount}</strong>. It{' '}
                                <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
                        </p>
                        <p>
                                {/* if you were to put a memo inside of IconButton, it'll still re-execute because of handleDecrement
                                     REMEMBER: functions are also objects and the memory address of the object changes everytime counter is executed 
                                     That's where useCallback comes in. Remember its usage in useEffect. This hook can be used to avoid receation of a function.
                                */}
                                <IconButton icon={MinusIcon} onClick={handleDecrement}>
                                        Decrement
                                </IconButton>
                                <CounterOutput value={currentCounter} />
                                <IconButton icon={PlusIcon} onClick={handleIncrement}>
                                        Increment
                                </IconButton>
                        </p>
                        <CounterHistory history={counterChanges} />
                </section>
        );
});

export default Counter;
