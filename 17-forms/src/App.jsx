import Header from './components/Header.jsx';

// Signup.jsx shows getting form input via FormData and Native Browser APIs
// which includes built-in validation props like required , type, minlen etc.
// import Signup from './components/Signup.jsx';

// StateLogin.jsx shows getting form input using state and oninput and focusout validation
import Login from './components/StateLogin.jsx';

// Login.jsx shows getting form input using ref and onSubmit validation
// import Login from './components/Login.jsx';

function App() {
        return (
                <>
                        <Header />
                        <main>
                                {/* <Signup /> */}
                                <Login />
                        </main>
                </>
        );
}

export default App;