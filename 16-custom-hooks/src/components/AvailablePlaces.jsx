import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';



async function fetchSortedPlaces() {
        const places = await fetchAvailablePlaces();

        // NOTE: async-await in React implicitly returns a promise object
        // But here we are explictly creating a promise to ensure that the fetchFn in useFetch eceives the correct value.
        // If we return sortedPlaces as a regular object then it may get returned as undefined because of the async nature of
        // the code. Consider this code instead:

        // let sortedPlaces;

        // navigator.geolocation.getCurrentPosition((position) => {

        // This callback function is called AFTER getCurrentPosition retrieves location information, 
        // but JS proceeds to line 30 return statement since getCurrentPosition works asynchronously
        //         sortedPlaces = sortPlacesByDistance(
        //                 places,
        //                 position.coords.latitude,
        //                 position.coords.longitude
        //         );
        // });

        // return sortedPlaces;

        // the value of sortedPlaces will be undefined, because we got here BEFORE getCurrentPosition callback is called. 
        // Note we have to return this outside of getCurrentPosition callback, 
        // since returning it inside doesn't return from fetchSortedPlaces.

        return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition((position) => {
                        const sortedPlaces = sortPlacesByDistance(
                                places,
                                position.coords.latitude,
                                position.coords.longitude
                        );

                        resolve(sortedPlaces);
                });
        });
}

export default function AvailablePlaces({ onSelectPlace }) {
        const { isFetching, error, fetchedData: availablePlaces } = useFetch(fetchSortedPlaces, []);

        if (error) {
                return <Error title="An error occurred!" message={error.message} />;
        }

        return (
                <Places
                        title="Available Places"
                        places={availablePlaces}
                        isLoading={isFetching}
                        loadingText="Fetching place data..."
                        fallbackText="No places available."
                        onSelectPlace={onSelectPlace}
                />
        );
}
