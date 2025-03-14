import { Suspense } from 'react';
import {
        useRouteLoaderData,
        json,
        redirect,
        defer,
        Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';


// to understand how Defer, Suspense and Await works, look at EventsPage.jsx
// here its demonstrated how to use Defer to load some data while waiting for other data
// we are waiting on 2 peices of data (event and events) from 2 loaders (see Defer below).
function EventDetailPage() {
        const { event, events } = useRouteLoaderData('event-detail');

        return (
                <>
                        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                                <Await resolve={event}>
                                        {(loadedEvent) => <EventItem event={loadedEvent} />}
                                </Await>
                        </Suspense>
                        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                                <Await resolve={events}>
                                        {(loadedEvents) => <EventsList events={loadedEvents} />}
                                </Await>
                        </Suspense>
                </>
        );
}

export default EventDetailPage;

async function loadEvent(id) {
        const response = await fetch('http://localhost:8080/events/' + id);

        if (!response.ok) {
                throw json(
                        { message: 'Could not fetch details for selected event.' },
                        {
                                status: 500,
                        }
                );
        } else {
                const resData = await response.json();
                return resData.event;
        }
}

async function loadEvents() {
        const response = await fetch('http://localhost:8080/events');

        if (!response.ok) {
                // return { isError: true, message: 'Could not fetch events.' };
                // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
                //   status: 500,
                // });
                throw json(
                        { message: 'Could not fetch events.' },
                        {
                                status: 500,
                        }
                );
        } else {
                const resData = await response.json();
                return resData.events;
        }
}

export async function loader({ request, params }) {
        // remember: you cannot use hooks like useParams hook in loader functions
        // But you still can get access to the route parameters that you need because react router,
        // which calls this loader function for you, actually passes an object to this loader function when executing it for you.
        // The object has a request and params property.
        const id = params.eventId;

        return defer({
                // here we are telling defer to wait on the loadEvent(id) (which is the event details) 
                // to return the data before loading the page.
                // loadEvents() returns the list of events and that can be loaded later after the page is loaded.
                event: await loadEvent(id),
                events: loadEvents(),
        });
}

export async function action({ params, request }) {
        const eventId = params.eventId;
        const response = await fetch('http://localhost:8080/events/' + eventId, {
                method: request.method,
        });

        if (!response.ok) {
                throw json(
                        { message: 'Could not delete event.' },
                        {
                                status: 500,
                        }
                );
        }
        return redirect('/events');
}
