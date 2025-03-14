import { useRef, useState } from 'react';


// usually we pass html as children 
// but here children is actually a function that we're passing in. See App.jsx
// itemKeyFn is an arrow func. See App.jsx
export default function SearchableList({ items, itemKeyFn, children }) {
        const lastChange = useRef();
        const [searchTerm, setSearchTerm] = useState('');

        // search logic
        // On inital load, since there is no search term, searchResults will have all the items.
        const searchResults = items.filter((item) =>
                JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
        );

        function handleChange(event) {
                // If there is a timer running, clear it
                if (lastChange.current) {
                        clearTimeout(lastChange.current)
                }

                // Only update state once user stops typing in the search bar
                // This prevents the state from neing updated for every user key stroke
                lastChange.current = setTimeout(() => {
                        lastChange.current = null   // manually clear the timeout ref once the timer expires.
                        setSearchTerm(event.target.value);
                }, 500);
        }

        return (
                <div className="searchable-list">
                        <input type="search" placeholder="Search" onChange={handleChange} />
                        <ul>
                                {/* render search results */}
                                {searchResults.map((item) => (
                                        <li key={itemKeyFn(item)}>
                                                {children(item)}
                                        </li>
                                ))}
                        </ul>
                </div>
        );
}