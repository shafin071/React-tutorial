import { QueryClient } from '@tanstack/react-query';


export const queryClient = new QueryClient();


export async function fetchEvents({ signal, searchTerm, max }) {
        // react-query also passes a signal object to the queryFn
        // the orignal object helps react-query abort a http request 
        // in case the user navigated away from the page while the request was still processing. 

        // max tells the backend how many items to send back. It's a pagination technique. 
        // You'll see that the backend endpoint looks for a max param in the URL.

        // fetchEvents is now flexible. It can fetch all the events or a specific event/s if a searchTerm is passed
        let url = 'http://localhost:3000/events';

        if (searchTerm && max) {
                url += '?search=' + searchTerm + '&max=' + max;
        } else if (searchTerm) {
                url += '?search=' + searchTerm;
        } else if (max) {
                url += '?max=' + max
        }

        // you can pass the signal object to fetch so the fetch can received the signal and abort when needed
        const response = await fetch(url, { signal: signal });

        if (!response.ok) {
                const error = new Error('An error occurred while fetching the events');
                error.code = response.status;
                error.info = await response.json();
                throw error;
        }

        const { events } = await response.json();

        return events;
}


export async function createNewEvent(eventData) {
        const response = await fetch(`http://localhost:3000/events`, {
                method: 'POST',
                body: JSON.stringify(eventData),
                headers: {
                        'Content-Type': 'application/json',
                },
        });

        if (!response.ok) {
                const error = new Error('An error occurred while creating the event');
                error.code = response.status;
                error.info = await response.json();
                throw error;
        }

        const { event } = await response.json();

        return event;
}


export async function fetchSelectableImages({ signal }) {
        const response = await fetch(`http://localhost:3000/events/images`, { signal });

        if (!response.ok) {
                const error = new Error('An error occurred while fetching the images');
                error.code = response.status;
                error.info = await response.json();
                throw error;
        }

        const { images } = await response.json();

        return images;
}


export async function fetchEvent({ id, signal }) {
        console.log("in fetchEvent:", id, signal);
        const response = await fetch(`http://localhost:3000/events/${id}`, { signal });

        if (!response.ok) {
                const error = new Error('An error occurred while fetching the event');
                error.code = response.status;
                error.info = await response.json();
                throw error;
        }

        const { event } = await response.json();

        return event;
}


export async function deleteEvent({ id }) {
        const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: 'DELETE',
        });

        if (!response.ok) {
                const error = new Error('An error occurred while deleting the event');
                error.code = response.status;
                error.info = await response.json();
                throw error;
        }

        return response.json();
}


export async function updateEvent({ id, event }) {
        const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ event }),
                headers: {
                        'Content-Type': 'application/json',
                },
        });

        if (!response.ok) {
                const error = new Error('An error occurred while updating the event');
                error.code = response.status;
                error.info = await response.json();
                throw error;
        }

        return response.json();
}