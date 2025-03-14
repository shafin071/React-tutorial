import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
        log('<HistoryItem /> rendered', 3);

        const [selected, setSelected] = useState(false);

        function handleClick() {
                setSelected((prevSelected) => !prevSelected);
        }

        return (
                <li onClick={handleClick} className={selected ? 'selected' : undefined}>
                        {count}
                </li>
        );
}

export default function CounterHistory({ history }) {
        log('<CounterHistory /> rendered', 2);

        return (
                // initially it was history.map((count, idx) => <HistoryItem key={idx} ...
                // Problem with idx of an array being the key is that, whenever a new item is added to the list, 
                // the position of the component instance changes. Lets say we have this list of components:
                // [ HistoryItem_0 HistoryItem_1, HistoryItem_2 ....] we have HistoryItem_1 highlighted.
                // Then we add a new instance of the HistoryItem component to the beginning of the list
                // [ HistoryItem_0 HistoryItem_1, HistoryItem_2, HistoryItem_3 ....]
                // previous HistoryItem_1 is now HistoryItem_2 and whatever state change was being applied to the previous _1 
                // will now be applied to the new _1. See the problem? That's why its always better to have the key as a unique id

                // another problem with using the idx as key is related to how React reloads the HTML based on virtual DOM

                // Recap: when a component is changed, React compares the new virtual DOM with the previous version 
                // and applies only the diff to the real HTML. That prevents the entire re-created of the entire DOM and only the part that changed.

                // As we add HistoryItem to the beginning of the list, the idx/key of the previous items will change, 
                // causing a re-render of the entire list even though the previous list HistoryItem content did not really change.

                <ol>
                        {history.map((count) => ( 
                                <HistoryItem key={count.id} count={count.value} />
                        ))}
                </ol>
        );
}
