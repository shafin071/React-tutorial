import { useEffect, useState } from 'react';


// custom hooks need to start with 'use' because its a React convention
// It makes React recognize this as a hook
// React hooks can be called inside components and custom hooks
// When a state updates in custom hooks, it will cause a re-execution of the component that uses the hook
// The state in the custom hook are tied to the component they're used in and are not shared across components.
// The state of useFetch in App.jsx will not be tied to another component that uses useFetch.
// Custom hooks are handy when we want to reuse code/logic that uses React hooks
export function useFetch(fetchFn, initialValue) {
        const [isFetching, setIsFetching] = useState();
        const [error, setError] = useState();
        const [fetchedData, setFetchedData] = useState(initialValue);

        useEffect(() => {
                async function fetchData() {
                        setIsFetching(true);
                        try {
                                const data = await fetchFn();
                                setFetchedData(data);
                        } catch (error) {
                                setError({ message: error.message || 'Failed to fetch data.' });
                        }

                        setIsFetching(false);
                }

                fetchData();
        }, [fetchFn]);
        // fetchFn is the dependency because if the func changes (which means the component is re-loaded)
        // we want useFetch to run again

        return {
                isFetching,
                fetchedData,
                setFetchedData,
                error
        }
}