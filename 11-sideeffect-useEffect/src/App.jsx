import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';


// This code block would not be a good candidate for useEffect if it was places inside App()
// because these don't have a callback function that can be executed later, so it would've executed instantly.
// And then setting the storage data to setPickedPlaces would've led to an infinite loop
// This code only runs once and does not run again when App() is rendered/re-rendered.
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);


function App() {
        const selectedPlace = useRef();
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [availablePlaces, setAvailablePlaces] = useState([]); // this state will hold the sorted places
        const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

        console.log("executing App...");

        // This code block takes the user's location using JS built-in navigator.geolocation and passes it to sortPlacesByDistance
        // to sort the places according it to user's location
        // This functionality is a side effect because it's not directly related to rendering the App component.
        // Also, this callback function will be called at after the component has finished executing and the JSX has been rendered.
        // NOTE: setPickedPlaces & setAvailablePlaces executes at the time the JSX is rendered, so useEffect function is called even after that.
        // useEffect function takes 2 arguments: effect func and dependency
        useEffect(() => {

                // Arrow func is the callback func that executes after the App component is rendered
                // because when the browser loads the component, you get a prompt to allow browser to get your location
                // Once you allow, then the arrow func is executed
                navigator.geolocation.getCurrentPosition((position) => {
                        console.log("running useEffect....")
                        const sortedPlaces = sortPlacesByDistance(
                                AVAILABLE_PLACES,
                                position.coords.latitude,
                                position.coords.longitude
                        );
                        setAvailablePlaces(sortedPlaces);
                });
        }, []);
        // Why do we need a dependency as argument?
        // Since useEffect func executes AFTER the component is rendered, 
        // the setAvailablePlaces can cause the App component to execute again and then the useEffect will execute again after App is rendered
        // This can set off an infinite loop. This is where the dependency comes in. 
        // useEffect will only execute its effect function again if the dependency value has changed.
        // In this case, the dependency is an empty array that is not tied to any state or object, so it will never change
        // Thus we make sure the useEffect function will only be executed once. 
        // This means, useEffect will only run once when
        // the page is refreshed, however when the App re-executes due to change of state, useEffect will not run again.


        function handleStartRemovePlace(id) {
                setModalIsOpen(true);
                selectedPlace.current = id;
        }

        function handleStopRemovePlace() {
                setModalIsOpen(false);
        }

        function handleSelectPlace(id) {
                setPickedPlaces((prevPickedPlaces) => {
                        if (prevPickedPlaces.some((place) => place.id === id)) {
                                return prevPickedPlaces;
                        }
                        const place = AVAILABLE_PLACES.find((place) => place.id === id);
                        return [place, ...prevPickedPlaces];
                });

                // This code block stores the selectedIDs in browser's local storage
                // This is an example of a side-effect function that doesn't need useEffect
                // Also useEffect and other React hooks can't be inside another function
                // NOTE: id is passed in handleSelectPlace
                const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
                if (storedIds.indexOf(id) === -1) {
                        localStorage.setItem(
                                'selectedPlaces',
                                JSON.stringify([id, ...storedIds])
                        );
                }
        }

        // See the dependency explanation in DeleteConfirmation useEffect for why this useCallback hook is needed
        // Callback hook makes sure the inner func dis not re-created when App re-executes. The inner func is stored in internally in memory.
        // Callback hook also takes 2 arguments, a func and a dependency
        // The dependency works the same way it does in useEffect
        // useCallback will only re-create the func if the dependency value has changed
        // But since we have an empty array, nothing will change, so the function will not be re-created
        const handleRemovePlace = useCallback(function handleRemovePlace() {
                // console.log("running handleRemovePlace useCallback");
                setPickedPlaces((prevPickedPlaces) =>
                  prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
                );
                setModalIsOpen(false);
            
                const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
                localStorage.setItem(
                  'selectedPlaces',
                  JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
                );
              }, []);

        // console.log("modalIsOpen: ", modalIsOpen)

        return (
                <>
                        <Modal open={modalIsOpen}  onClose={handleStopRemovePlace}>
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
                                <Places
                                        title="I'd like to visit ..."
                                        fallbackText={'Select the places you would like to visit below.'}
                                        places={pickedPlaces}
                                        onSelectPlace={handleStartRemovePlace}
                                />
                                <Places
                                        title="Available Places"
                                        places={availablePlaces}
                                        fallbackText="Sorting places by distance..."
                                        onSelectPlace={handleSelectPlace}
                                />
                        </main>
                </>
        );
}

export default App;
