import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';



function App() {
        const selectedPlace = useRef();

        const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

        const [modalIsOpen, setModalIsOpen] = useState(false);

        // here userPlaces is the alias we give to fetchedData
        const { isFetching, error, fetchedData: userPlaces, setFetchedData: setUserPlaces } = useFetch(fetchUserPlaces, []);

        function handleStartRemovePlace(place) {
                setModalIsOpen(true);
                selectedPlace.current = place;
        }

        function handleStopRemovePlace() {
                setModalIsOpen(false);
        }

        async function handleSelectPlace(selectedPlace) {
                // await updateUserPlaces([selectedPlace, ...userPlaces]);

                setUserPlaces((prevPickedPlaces) => {
                        if (!prevPickedPlaces) {
                                prevPickedPlaces = [];
                        }
                        if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                                return prevPickedPlaces;
                        }
                        return [selectedPlace, ...prevPickedPlaces];
                });

                try {
                        await updateUserPlaces([selectedPlace, ...userPlaces]);
                } catch (error) {
                        setUserPlaces(userPlaces);
                        setErrorUpdatingPlaces({
                                message: error.message || 'Failed to update places.',
                        });
                }
        }

        const handleRemovePlace = useCallback(
                async function handleRemovePlace() {
                        setUserPlaces((prevPickedPlaces) =>
                                prevPickedPlaces.filter(
                                        (place) => place.id !== selectedPlace.current.id
                                )
                        );

                        try {
                                await updateUserPlaces(
                                        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
                                );
                        } catch (error) {
                                setUserPlaces(userPlaces);
                                setErrorUpdatingPlaces({
                                        message: error.message || 'Failed to delete place.',
                                });
                        }

                        setModalIsOpen(false);
                },
                [userPlaces]
                // setUserPlaces is added as dependency because there can be a warning that suggests
                // setUserPlaces to be added as dependecy as well. But technically it doesn't make any difference in the useCallback
                // RECALL: React guarantees state updating function objects are guaranteed to be the same
                // but since setUserPlaces is a state updating function in a custom hook, React does not recognize
                // that function as such.
                // NOTE: We are using useCallback because handleRemovePlace function is a dependency 
                // for useEffect in DeleteConfirmtion.jsx
        );

        function handleError() {
                setErrorUpdatingPlaces(null);
        }

        return (
                <>
                        <Modal open={errorUpdatingPlaces} onClose={handleError}>
                                {errorUpdatingPlaces && (
                                        <Error
                                                title="An error occurred!"
                                                message={errorUpdatingPlaces.message}
                                                onConfirm={handleError}
                                        />
                                )}
                        </Modal>

                        <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                                <DeleteConfirmation
                                        onCancel={handleStopRemovePlace}
                                        onConfirm={handleRemovePlace}
                                />
                        </Modal>

                        <header>
                                <img src={logoImg} alt="Stylized globe" />
                                <h1>PlacePicker</h1>
                                <p>
                                        Create your personal collection of places you would like to visit or
                                        you have visited.
                                </p>
                        </header>
                        <main>
                                {error && <Error title="An error occurred!" message={error.message} />}
                                {!error && (
                                        <Places
                                                title="I'd like to visit ..."
                                                fallbackText="Select the places you would like to visit below."
                                                isLoading={isFetching}
                                                loadingText="Fetching your places..."
                                                places={userPlaces}
                                                onSelectPlace={handleStartRemovePlace}
                                        />
                                )}

                                <AvailablePlaces
                                        onSelectPlace={handleSelectPlace}
                                />
                        </main>
                </>
        );
}

export default App;