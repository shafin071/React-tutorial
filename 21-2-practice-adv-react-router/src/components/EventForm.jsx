import {
        Form,
        useNavigate,
        useNavigation,
        useActionData,
        json,
        redirect
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
        console.log(method, event)
        // gets the data returned by the closest action
        const data = useActionData();
        const navigate = useNavigate();
        const navigation = useNavigation();

        const isSubmitting = navigation.state === 'submitting';

        function cancelHandler() {
                navigate('..');
        }

        return (
                // The Form tag will make sure that the browser default
                // of sending a request to the backend will be omitted
                // but it will take that request that would've been sent
                // and give it to your action. And that's pretty useful because that request
                // will contain all the data that was submitted as part of the form.
                // Another way of triggering a router action is by adding action to the Form
                // <Form method='post' action='/some-other-path' className={classes.form}>
                <Form method={method} className={classes.form}>
                        {data && data.errors && (
                                <ul>
                                        {Object.values(data.errors).map((err) => (
                                                <li key={err}>{err}</li>
                                        ))}
                                </ul>
                        )}
                        <p>
                                <label htmlFor="title">Title</label>
                                <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        required
                                        defaultValue={event ? event.title : ''}
                                />
                        </p>
                        <p>
                                <label htmlFor="image">Image</label>
                                <input
                                        id="image"
                                        type="url"
                                        name="image"
                                        required
                                        defaultValue={event ? event.image : ''}
                                />
                        </p>
                        <p>
                                <label htmlFor="date">Date</label>
                                <input
                                        id="date"
                                        type="date"
                                        name="date"
                                        required
                                        defaultValue={event ? event.date : ''}
                                />
                        </p>
                        <p>
                                <label htmlFor="description">Description</label>
                                <textarea
                                        id="description"
                                        name="description"
                                        rows="5"
                                        required
                                        defaultValue={event ? event.description : ''}
                                />
                        </p>
                        <div className={classes.actions}>
                                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                                        Cancel
                                </button>
                                <button disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Save'}
                                </button>
                        </div>
                </Form>
        );
}

export default EventForm;


// action is like loader
// you can add this function to the NewPageEvent route in App.js
// it makes it easier to submit form data to backend with react-router
// this action will add or edit an event
export async function action({ request, params }) {
        console.log("in EventForm action")
        const method = request.method;
        const data = await request.formData();

        const eventData = {
                title: data.get('title'),
                image: data.get('image'),
                date: data.get('date'),
                description: data.get('description'),
        };

        let url = 'http://localhost:8080/events';

        if (method === 'PATCH') {
                const eventId = params.eventId;
                url = 'http://localhost:8080/events/' + eventId;
        }

        const response = await fetch(url, {
                method: method,
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
        });

        if (response.status === 422) {
                return response;
        }

        if (!response.ok) {
                throw json({ message: 'Could not save event.' }, { status: 500 });
        }

        return redirect('/events');
}
