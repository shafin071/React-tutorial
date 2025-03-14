import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
        //
        const submit = useSubmit();

        function startDeleteHandler() {
                const proceed = window.confirm('Are you sure?');

                if (proceed) {
                        // submit takes 2 args
                        // data which is null in this case
                        // 2nd arg is an object that has the same values as in a form
                        // submit sends the args to action in EventDetailPage
                        submit(null, { method: 'delete' });
                }
        }

        return (
                <article className={classes.event}>
                        <img src={event.image} alt={event.title} />
                        <h1>{event.title}</h1>
                        <time>{event.date}</time>
                        <p>{event.description}</p>
                        <menu className={classes.actions}>
                                <Link to="edit">Edit</Link>
                                <button onClick={startDeleteHandler}>Delete</button>
                        </menu>
                </article>
        );
}

export default EventItem;