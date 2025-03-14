import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';


function EventsPage() {
        // useLoaderData gets the data returned by the loader function in react router in App.jsx
        // loader function returns the data wrapped in a promise object
        // useLoaderData gets the data from the promise under the hood.
        // You can also use useLoaderData in EventsList as well.
        const { events } = useLoaderData();

        return (
                // since we are using defer to get data from the loader, we have to use Await to show the events
                // remember: since the async loader returns a promise object, which is received from useLoaderData
                // we have to pass the promise object to Await
                // Suspense is a component that shows a fallback content while we are waiting on Await to get all the data
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                        <Await resolve={events}>
                                {(loadedEvents) => <EventsList events={loadedEvents} />}
                        </Await>
                </Suspense>
        );
}

export default EventsPage;


// You cannot use React hooks like useState inside loaders
async function loadEvents() {
        const response = await fetch('http://localhost:8080/events');

        if (!response.ok) {
                // return { isError: true, message: 'Could not fetch events.' };
                // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
                //   status: 500,
                // });

                // json creates a response object
                // benefit: on the recieving end, the response does not need to be JSON parsed. React-router will do it for you.
                throw json(
                        { message: 'Could not fetch events.' },
                        {
                                status: 500,
                        }
                );
        } else {
                // before in this else statement, we could return a response object from our loader 
                // but now since we are using it in defer, we can no longet do that.
                // we have to manually parse the response data and return the events.
                const resData = await response.json();
                return resData.events;
        }
}

export function loader() {
        // defer allows a page/component to be partially loaded without receiving the data.
        // defer takes an object as input. loadEvents is an async function and will return a promise object
        return defer({
                events: loadEvents(),
        });
}
