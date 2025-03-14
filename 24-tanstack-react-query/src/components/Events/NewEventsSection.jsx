import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';


export default function NewEventsSection() {
        // One of the perks of using react-query is that it is reactive to the change in data in backend
        // if you change the data in backend/data/events.json, then go to a different tab and then come back, 
        // you'll notice react-query gets the latest data and updates the page.

        // queryFn requires a function that'll return a promise, which is usually the async function that does the http request
        // queryKey is the key name for the request data that is cached by react-query so it canm be reused in the future.
        // NOTE: queryKey is an array because we can use multiple values  as the key

        // react-query caches the data so when you go to an event details page and go back to all events
        // react-query sends a request to the cache and gets the data, but it also checks if the data has been changed,
        // if yes, then it replaces the data object with the newer data.
        const { data, isPending, isError, error } = useQuery({
                queryKey: ['events', { max: 3 }],

                // ...queryKey[1] spreads the queryKey object and get the 2nd item from there which is the max value.
                queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),

                // If react-query didnt send a request for the data within 5 seconds, then after 5 seconds react-query will send a 
                // behind-the-scene request to the backend to get the updated data.
                // you can test this by refrshing the page, then going into an event details page and then
                // coming back to the events within 5 seconds. This causes react-query to send a request.
                // But you go to the events details page and sit there for more than 5 seconds, then come back to
                // the events page, then react-query sends another request
                staleTime: 5000,  // milliseconds -> 5 seconds

                // garbage control time (milliseconds)
                // controls the TTL of the cache
                // gcTime: 1000

        });

        let content;

        if (isPending) {
                content = <LoadingIndicator />;
        }

        if (isError) {
                content = (
                        <ErrorBlock
                                title="An error occurred"
                                // error.info?.message checks if the error object has an info property
                                // the info property is set in util/http.js
                                message={error.info?.message || 'Failed to fetch events.'}
                        />
                );
        }

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
                <section className="content-section" id="new-events-section">
                        <header>
                                <h2>Recently added events</h2>
                        </header>
                        {content}
                </section>
        );
}