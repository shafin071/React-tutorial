import { useState } from 'react';


export default function Signup() {
        const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

        function handleSubmit(event) {
                event.preventDefault();

                // FormData is a constructor provided by the browser
                // FormData object makes it easy to get hold of the different form values.
                // You can create the FormData object by passing in the form which is in event.target
                const fd = new FormData(event.target);

                // acquisition are the name of the checkbox input fields
                // We need to do a getall to get all checked field from checkbox field options
                // Otherwise multiple checked options are not captured in fd.entries()
                const acquisitionChannel = fd.getAll('acquisition');

                // Object.fromEntries will give all the form field values in key-value pairs
                const data = Object.fromEntries(fd.entries());
                data.acquisition = acquisitionChannel;

                // Another way of resetting the form.
                // event.target.reset();
                // We shouldn't use ref to clear the input fields because we don't want 
                // to manipulate DOM.

                if (data.password !== data['confirm-password']) {
                        setPasswordsAreNotEqual(true);
                        return;
                }

                console.log(data);
        }

        return (
                <form onSubmit={handleSubmit}>
                        <h2>Welcome on board!</h2>
                        <p>We just need a little bit of data from you to get you started 🚀</p>

                        <div className="control">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" name="email" required />
                        </div>

                        <div className="control-row">
                                <div className="control">
                                        <label htmlFor="password">Password</label>
                                        <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                minLength={6}
                                        />
                                </div>

                                <div className="control">
                                        <label htmlFor="confirm-password">Confirm Password</label>
                                        <input
                                                id="confirm-password"
                                                type="password"
                                                name="confirm-password"
                                                required
                                        />
                                        <div className="control-error">
                                                {passwordsAreNotEqual && <p>Passwords must match.</p>}
                                        </div>
                                </div>
                        </div>

                        <hr />

                        <div className="control-row">
                                <div className="control">
                                        <label htmlFor="first-name">First Name</label>
                                        <input type="text" id="first-name" name="first-name" required />
                                </div>

                                <div className="control">
                                        <label htmlFor="last-name">Last Name</label>
                                        <input type="text" id="last-name" name="last-name" required />
                                </div>
                        </div>

                        <div className="control">
                                <label htmlFor="phone">What best describes your role?</label>
                                <select id="role" name="role" required>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="employee">Employee</option>
                                        <option value="founder">Founder</option>
                                        <option value="other">Other</option>
                                </select>
                        </div>

                        <fieldset>
                                <legend>How did you find us?</legend>
                                <div className="control">
                                        <input
                                                type="checkbox"
                                                id="google"
                                                name="acquisition"
                                                value="google"
                                        />
                                        <label htmlFor="google">Google</label>
                                </div>

                                <div className="control">
                                        <input
                                                type="checkbox"
                                                id="friend"
                                                name="acquisition"
                                                value="friend"
                                        />
                                        <label htmlFor="friend">Referred by friend</label>
                                </div>

                                <div className="control">
                                        <input type="checkbox" id="other" name="acquisition" value="other" />
                                        <label htmlFor="other">Other</label>
                                </div>
                        </fieldset>

                        <div className="control">
                                <label htmlFor="terms-and-conditions">
                                        <input
                                                type="checkbox"
                                                id="terms-and-conditions"
                                                name="terms"
                                                required
                                        />
                                        I agree to the terms and conditions
                                </label>
                        </div>

                        <p className="form-actions">
                                <button type="reset" className="button button-flat">
                                        Reset
                                </button>
                                <button type="submit" className="button">
                                        Sign up
                                </button>
                        </p>
                </form>
        );
}