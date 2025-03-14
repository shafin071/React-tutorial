import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';


export default function NewEvent() {
        const navigate = useNavigate();

        // mutate is a function that can be used to call createNewEvent and pass the form data 
        const { mutate, isPending, isError, error } = useMutation({
                mutationFn: createNewEvent,
                onSuccess: () => {
                        // invalidate all queryKey/cache that include the key 'events'.
                        // this will also invalidate the queryKey in FindEventSection, which can be avoided by including 
                        // the 'exact' bool property to only invalidate keys == 'events' but we don't want outdated data once
                        // a new event is added because that event could also be in the search results. 
                        // Hence we want to invalidate that cache as well. 
                        queryClient.invalidateQueries({ 
                                queryKey: ['events']
                                // exact: true 
                        });
                        navigate('/events');
                },
        });

        function handleSubmit(formData) {
                mutate({ event: formData });
        }

        return (
                <Modal onClose={() => navigate('../')}>
                        <EventForm onSubmit={handleSubmit}>
                                {isPending && 'Submitting...'}
                                {!isPending && (
                                        <>
                                                <Link to="../" className="button-text">
                                                        Cancel
                                                </Link>
                                                <button type="submit" className="button">
                                                        Create
                                                </button>
                                        </>
                                )}
                        </EventForm>
                        {isError && (
                                <ErrorBlock
                                        title="Failed to create event"
                                        message={
                                                error.info?.message ||
                                                'Failed to create event. Please check your inputs and try again later.'
                                        }
                                />
                        )}
                </Modal>
        );
}