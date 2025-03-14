import { useRef, useState } from 'react';


export default function Login() {
        const [emailIsInvalid, setEmailIsInvalid] = useState(false);

        console.log('executing Login...');

        // using ref instead of state
        // pros: less code
        // cons: 
        // if there are lots of fields, then you need lots of refs
        // resetting the form may be less cleaner as you have to use DOM manipulation
        // to do so and remember, we want to use refs for DOM manipulation.
        const email = useRef();
        const password = useRef();

        function handleSubmit(event) {
                event.preventDefault();

                const enteredEmail = email.current.value;
                console.log('enteredEmail: ', enteredEmail);
                const enteredPassword = password.current.value;

                const emailIsValid = enteredEmail.includes('@');
                console.log('emailIsValid: ', emailIsValid);

                if (!emailIsValid) {
                        setEmailIsInvalid(true);
                        return;
                }

                setEmailIsInvalid(false);

                console.log('Sending HTTP request...');
        }

        return (
                <form onSubmit={handleSubmit}>
                        <h2>Login</h2>

                        <div className="control-row">
                                <div className="control no-margin">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" name="email" ref={email} />
                                        <div className="control-error">
                                                {emailIsInvalid && <p>Please enter a valid email address.</p>}
                                        </div>
                                </div>

                                <div className="control no-margin">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" name="password" ref={password} />
                                </div>
                        </div>

                        <p className="form-actions">
                                <button className="button button-flat">Reset</button>
                                <button className="button">Login</button>
                        </p>
                </form>
        );
}