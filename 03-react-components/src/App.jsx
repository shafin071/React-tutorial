import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';


// React hook rules:
//      🔴 Do not call Hooks inside conditions or loops.
//      🔴 Do not call Hooks after a conditional return statement.
//      🔴 Do not call Hooks in event handlers.
//      🔴 Do not call Hooks in class components.
//            hooks can be called next to other hooks

// Computed values are values that shouldn't be managed as separate state since they can be derived from other state.


function App() {
        console.log("APP COMPONENT EXECUTING");

        // NOTE: All the sub-components of App in the JSX are re-executed again when the TabButton state in App updates.
        // So its better to break up the big App components into smaller components and make the state specific to the component
        // Before the userState was in App but it was mainly being used for TabButton in Examples section
        return (
                <div> 
                {/* JSX expression must always have a parent div. In JS, you cannot have a func return value in this format (a,b) 
                     The Header component and Main tag are your a and b. So think of the div as an object that contains Header and Main.
                     Alternative to having a parent div element is to have Fragment element that does the same thing as div.
                     <Fragment><Header /><main></main></Fragment>  you need to import gragment from react
                     OR in even shorter form  <><Header /><main></main></> */}
                        <Header />
                        <main>
                                <CoreConcepts />
                                <Examples />
                        </main>
                </div>
        );
}

export default App;
