import { useState } from 'react';
import { styled } from 'styled-components';

// Styled component
import Button from './Button.jsx';
// since CustomInput is a default export, we can rename it to Input while importing
import Input from './Input.jsx';  


// Styled component is another alternative to injecting CSS styles in a component
// npm install styled-components
// Pro: styled-components are configurable(can pass props to it), scoped to components and reusable
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({ $invalid }) => ($invalid ? '#fed2d2' : '#d1d5db')};
  color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
  border: 1px solid ${({ $invalid }) => ($invalid ? '#f73f3f' : 'transparent')};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function AuthInputs() {
        const [enteredEmail, setEnteredEmail] = useState('');
        const [enteredPassword, setEnteredPassword] = useState('');
        const [submitted, setSubmitted] = useState(false);

        function handleInputChange(identifier, value) {
                if (identifier === 'email') {
                        setEnteredEmail(value);
                } else {
                        setEnteredPassword(value);
                }
        }

        function handleLogin() {
                setSubmitted(true);
        }

        const emailNotValid = submitted && !enteredEmail.includes('@');
        const passwordNotValid = submitted && enteredPassword.trim().length < 6;

        return (
                <div id="auth-inputs">
                        {/* <div className="controls"> */}
                        <ControlContainer>
                                <p>
                                        {/* Conditional styling with styled components. See Label above.
                                              $invalid is a valid prop name. The $ is added so that there's no name clash with built-in props for label
                                              label tag does have a built-in prop named invalid */}
                                        {/* <Label $invalid={emailNotValid}>Email</Label> */}
                                        {/* <Input
                                                type="email"
                                                className={emailNotValid ? 'invalid' : undefined}
                                                onChange={(event) => handleInputChange('email', event.target.value)}
                                        /> */}

                                        <Input
                                                label="Email"
                                                invalid={emailNotValid}
                                                type="email"
                                                onChange={(event) => handleInputChange('email', event.target.value)}
                                        />
                                </p>
                                <p>
                                        {/* Regular conditional styling using ternary operator */}
                                        <Label className={`label ${emailNotValid ? 'invalid' : undefined} `}>Password</Label>
                                        <StyledInput
                                                type="password"
                                                className={passwordNotValid ? 'invalid' : undefined}
                                                onChange={(event) =>
                                                        handleInputChange('password', event.target.value)
                                                }
                                        />
                                </p>
                        </ControlContainer>
                        {/* </div> */}

                        <div className="actions">
                                <button type="button" className="text-button">
                                        Create a new account
                                </button>
                                <button className='button' onClick={handleLogin}>Sign In</button>
                        </div>
                </div>
        );
}
