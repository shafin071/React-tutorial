import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';


function App() {
        log('<App /> rendered');

        const [chosenCount, setChosenCount] = useState(0);

        function handleSetCount(newCount) {
                // Another brush-up on how updating the state works
                // state update is a scheduled update where the updated state is rendered when the JSX is served.
                setChosenCount(newCount);

                // this kind of state update is incorrectand can lead to bugs because chosenCount can be an older state
                // setChosenCount(chosenCount + 1);

                // this kind of state update is OK
                // setChosenCount((prevChosenCount) => prevChosenCount + 1);

                // Now let's say we chain state updates like this:
                // setChosenCount(newCount);
                // setChosenCount((prevChosenCount) => prevChosenCount + 1);
                // This doesn't mean the App component will re-execute twice. When chaining updates, React performs state batching
                // meaning both the updates will be executed one after another and then the component will rendered with the final;
                // updated state
        }

        return (
                <>
                        <Header />
                        <main>
                                <ConfigureCounter onSet={handleSetCount} />
                                {/* here we created to Counter components to demo that the  state inside it is scoped to the specific component
                                i.e a state change in the 1st Counter won't affect the 2nd Counter .
                                However, sometimes state can depend on position as well.  
                                For example, <li class="selected"> on click which highlights that li item in that position.
                                Look at the explanation in CounterHistory 
                                
                                also fun fact: React preserves a component’s state for as long as it’s being rendered at its position 
                                                     in the UI tree. If it gets removed, or a different component gets rendered at the same 
                                                     position, React discards its state.
                                
                                Meaning if chosenCount change and triggers a re-render of Counter, the counterChanges state inside
                                Counter will still hold the previous values.

                                If we want to reset that state, one trick is to add a key to Counter component. Now when the chosenCount
                                changes, Counter key changes and React thinks the position of the component changed, so it throws away
                                the existing component and creates a fresh one with a fresh counterChanges state.

                                This is a nifty trick to reset a component. Another way to reset a component is to useEffect inside Counter
                                but thatapproach is less preferred as we want to limit the use of useEffect.
                                */}
                                <Counter key={chosenCount} initialCount={chosenCount} />
                                <Counter initialCount={0} />
                        </main>
                </>
        );
}

export default App;
