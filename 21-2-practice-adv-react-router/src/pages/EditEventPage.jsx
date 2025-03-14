import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
        // NOTE: this only gets the data already loaded from the loader
        // This does not make the loader do another API call.
        const data = useRouteLoaderData('event-detail');

        return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;