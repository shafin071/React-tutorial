import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
        const searchElement = useRef();
        const [searchTerm, setSearchTerm] = useState();

        const { data, isLoading, isError, error } = useQuery({
                // All the items in that array are "put together" to create a unique query key 
                // (how React Query differentiates between different data that is in the cache).  
                // Since this data is of the "event" type, we chose to use that as a generic key (which will be visible in the React Query devtools), 
                // and then append a more specific key (in the form of an object that is the searchTerm) onto that.
                // see the signal explanation in fetchEvents. React-query passes this signal object to fetchEvents.
                queryKey: ['events', { search: searchTerm }],

                // ...queryKey[1] spreads the queryKey object and get the 2nd item from there which is the searchTerm
                queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),

                // the enabled (bool) property when false, can disable react-query from firing fetchEvents
                // This flag is set so that the find-event is not triggered on the first page load since we won't have a searchTerm set.
                // NOTE: isLoading will be false if the query is disabled
                enabled: searchTerm !== undefined
        });

        function handleSubmit(event) {
                event.preventDefault();
                setSearchTerm(searchElement.current.value);
        }

        let content = <p>Please enter a search term and to find events.</p>;

        if (isLoading) {
                content = <LoadingIndicator />;
        }

        if (isError) {
                content = (
                        <ErrorBlock
                                title="An error occurred"
                                message={error.info?.message || 'Failed to fetch events.'}
                        />
                );
        }

        // ALWAYS check if data exists fist because rendering them out into JSX
        // useQuery goes through different transitions. 
        // When the page is first loaded, data doesn't exists but it being fetched in the background
        if (data) {
                content = (
                        <ul className="events-list">
                                {data.map((event) => (
                                        <li key={event.id}>
                                                <EventItem event={event} />
                                        </li>
                                ))}
                        </ul>
                );
        }

        return (
                <section className="content-section" id="all-events-section">
                        <header>
                                <h2>Find your next event!</h2>
                                <form onSubmit={handleSubmit} id="search-form">
                                        <input
                                                type="search"
                                                placeholder="Search events"
                                                ref={searchElement}
                                        />
                                        <button>Search</button>
                                </form>
                        </header>
                        {content}
                </section>
        );
}