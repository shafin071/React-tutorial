import Input from './Input.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import { useInput } from '../hooks/useInput.jsx'


export default function Login() {
        // const [enteredEmail, setEnteredEmail] = useState('');
        // const [enteredPassword, setEnteredPassword] = useState('');
        // const [enteredValues, setEnteredValues] = useState({
        //         email: '',
        //         password: '',
        // });
        // NOTE: with stateful approach, one advantage is that we can do key-stroke validation
        // as the state updates per input. 

        // const [didEdit, setDidEdit] = useState({
        //         email: false,
        //         password: false,
        // });

        const {
                value: emailValue,
                handleInputChange: handleEmailChange,
                handleInputBlur: handleEmailBlur,
                hasError: emailHasError,
        } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
        const {
                value: passwordValue,
                handleInputChange: handlePasswordChange,
                handleInputBlur: handlePasswordBlur,
                hasError: passwordHasError,
        } = useInput('', (value) => hasMinLength(value, 6));

        // with didEdit state, we are giving the user a chance to give an input before its validated
        // Validation will be triggered on focusout
        // Validation is now passed to useInput 
        // const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email)

        // const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

        function handleSubmit(event) {
                event.preventDefault();

                if (emailHasError || passwordHasError) {
                        return;
                }

                console.log(emailValue, passwordValue);
        }

        // Following functions moved to custom hook useInput

        // function handleInputChange(identifier, value) {
        //         setEnteredValues((prevValues) => ({
        //                 ...prevValues,
        //                 [identifier]: value,
        //         }));
        //         // This removes the input validation error message as the user starts typing 
        //         // an input again
        //         setDidEdit((prevEdit) => ({
        //                 ...prevEdit,
        //                 [identifier]: false,
        //         }));
        // }

        // function handleInputBlur(identifier) {
        //         setDidEdit((prevEdit) => ({
        //                 ...prevEdit,
        //                 [identifier]: true,
        //         }));
        // }

        return (
                <form onSubmit={handleSubmit}>
                        <h2>Login</h2>

                        <div className="control-row">
                                <Input
                                        label="Email"
                                        id="email"
                                        type="email"
                                        name="email"
                                        onBlur={handleEmailBlur}
                                        onChange={handleEmailChange}
                                        value={emailValue}
                                        error={emailHasError && 'Please enter a valid email!'}
                                />

                                <Input
                                        label="Password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordBlur}
                                        value={passwordValue}
                                        error={passwordHasError && 'Please enter a valid password!'}
                                />
                        </div>

                        <p className="form-actions">
                                <button className="button button-flat">Reset</button>
                                <button className="button">Login</button>
                        </p>
                </form>
        );
}