import {
        Link,
        redirect,
        useNavigate,
        useParams,
        useSubmit,
        useNavigation,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
        const navigate = useNavigate();
        const { state } = useNavigation();
        const submit = useSubmit();

        const params = useParams();

        // Since we are using a loader to get the data, we can just use useLoaderData to get the data
        // but in this case we'll leave the useQuery here because since the query is already done in the data,
        // this query just gets the cached data.
        const { data, isError, error } = useQuery({
                queryKey: ['events', params.id],  // this key combo is cached previously in EventsDetails.jsx
                queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
                staleTime: 10000 // don't fire this useQuery if the data has been stale for less than 10 seconds.
        });

        // Since we are now using route action to submit the form data and update the backend
        // we will no longer need this optimistic update apporach
        // In general, using react-router with react-query is the best approach to get the most flavor out of routing and data transacation.

        // const { mutate } = useMutation({
        //         mutationFn: updateEvent,

        //         // The following approach is called Optimistic Update. We optimisticly update the frontend before we 
        //         // send the data to backend and get a success response. 
        //         // That way we see the updated data in frontend right away instead of staring at a loading spinner.
        //         // In case there's an error while updating the data in the backend, the data will be rolled back.

        //         // onMutate is called right as you call mutate. 
        //         // this is the first to be called even before we receive a response from backend
        //         // this gets the data passed to mutate({ id: params.id, event: formData });
        //         onMutate: async (data) => {
        //                 const newEvent = data.event;

        //                 // cancelQueries cancels all active queries or the queries matching the provided key.
        //                 // we're making sure that if we had any outgoing queries for that key using useQuery (NOT useMutation), 
        //                 // those queries would be canceled and we would not have clashing response data from those queries
        //                 // cancelQueries returns a prmise object so we used await.
        //                 await queryClient.cancelQueries({ queryKey: ['events', params.id] });

        //                 // this gives us current query data. 
        //                 // We want to store it in previousEvent in case we want to roll back the data.
        //                 const previousEvent = queryClient.getQueryData(['events', params.id]);

        //                 // this updates query's cached data with the newEvent data
        //                 queryClient.setQueryData(['events', params.id], newEvent);

        //                 return { previousEvent };
        //         },

        //         // on error from backend, rollback to the previous data
        //         // context is the object returned by onMutate
        //         onError: (error, data, context) => {
        //                 queryClient.setQueryData(['events', params.id], context.previousEvent);
        //         },

        //         // onSettled is called whenever useMutation is finished no matter if it failed or succeeded.
        //         // after useMutation is finished, invalidate the query cache. 
        //         // This makes sure the query data gets the latest data even though we used queryClient.setQueryData in onMutate
        //         // and in case of error, rolled back the data. This step just ensures we get the latest data again.
        //         onSettled: () => {
        //                 queryClient.invalidateQueries(['events', params.id]);
        //         }
        // });

        function handleSubmit(formData) {
                // mutate({ id: params.id, event: formData });
                // navigate('../');
                submit(formData, { method: 'PUT' });
        }

        function handleClose() {
                navigate('../');
        }

        let content;

        // since we are using a route loader to load the data, we no longer need this isPending bool
        // because the data will already be loaded and there will be no pending state.
        // if (isPending) {
        //         content = (
        //                 <div className="center">
        //                         <LoadingIndicator />
        //                 </div>
        //         );
        // }

        if (isError) {
                content = (
                        <>
                                <ErrorBlock
                                        title="Failed to load event"
                                        message={
                                                error.info?.message ||
                                                'Failed to load event. Please check your inputs and try again later.'
                                        }
                                />
                                <div className="form-actions">
                                        <Link to="../" className="button">
                                                Okay
                                        </Link>
                                </div>
                        </>
                );
        }

        if (data) {
                content = (
                        <EventForm inputData={data} onSubmit={handleSubmit}>
                                {state === 'submitting' ? (
                                        <p>Sending data...</p>
                                ) : (
                                        <>
                                                <Link to="../" className="button-text">
                                                        Cancel
                                                </Link>
                                                <button type="submit" className="button">
                                                        Update
                                                </button>
                                        </>
                                )}
                        </EventForm>
                );
        }

        return <Modal onClose={handleClose}>{content}</Modal>;
}


export function loader({ params }) {
        // same thing as useQuery
        return queryClient.fetchQuery({
                queryKey: ['events', params.id],  // this key combo is cached previously in EventsDetails.jsx
                queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
        });
}


export async function action({ request, params }) {
        const formData = await request.formData();
        const updatedEventData = Object.fromEntries(formData);
        await updateEvent({ id: params.id, event: updatedEventData });
        await queryClient.invalidateQueries(['events']);  // invalidate all queiry cached data that has the 'event' key in it.
        return redirect('../');
}