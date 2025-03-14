// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage

// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage

// 3. Add a root layout that adds the <MainNavigation> component above all page components

// 4. Add properly working links to the MainNavigation

// 5. Ensure that the links in MainNavigation receive an "active" class when active

// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage

// 7. Output the ID of the selected event on the EventDetailPage

// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components


import {
        createBrowserRouter,
        RouterProvider
} from 'react-router-dom';

import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import EventDetailPage, {
        loader as eventDetailLoader,
        action as deleteEventAction,
} from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import { action as manipulateEventAction } from './components/EventForm';
import NewEventPage from './pages/NewEventPage';
import ErrorPage from './pages/Error';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';


const router = createBrowserRouter([
        {
                path: '/',

                // RootLayout has the MainNavigation component and the outlet
                //  HomePage will be the default outlet
                element: <RootLayout />,

                // You also have the option to add errorElement to child routes so the error can be handled at the level.
                // But if we don't provide an errorElement in child route, Errors can bubble up to the root.
                errorElement: <ErrorPage />,
                children: [
                        { index: true, element: <HomePage /> },
                        {
                                path: 'events', element: <EventsRootLayout />,
                                children: [
                                        {
                                                index: true, element: <EventsPage />,
                                                // loader will fetch the data and make it available for the page being rendered
                                                // loader is called at the start when we start navigating to a page. 
                                                // React router will wait for the fetched data to render the page
                                                // loader function returns the data wrapped in a promise object
                                                // Any of the child route pages or the components they render can have access to this load data
                                                loader: eventsLoader,
                                        },
                                        {
                                                // NOTE: this parent route does not have an element because we don't want a shared
                                                // page like a rootLayout 
                                                path: ':eventId',
                                                id: 'event-detail',   // the id is used to fetch loader data. See EditEventPage
                                                loader: eventDetailLoader,
                                                // these routes are nested under /:eventId because we want the loader data to be accessible
                                                // in these child pages/components
                                                children: [
                                                        { index: true, element: <EventDetailPage />, action: deleteEventAction, },
                                                        { path: 'edit', element: <EditEventPage />, action: manipulateEventAction }
                                                ]
                                        },
                                        { path: 'new', element: <NewEventPage />, action: manipulateEventAction },
                                ]
                        },
                        {
                                path: 'newsletter',
                                element: <NewsletterPage />,
                                action: newsletterAction,
                        },

                ],

        }
],
);


function App() {



        return <div><RouterProvider router={router} /></div>;
}

export default App;
