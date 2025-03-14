import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
        // Interacts with route loaders and actions without causing a navigation. 
        // Great for any interaction that stays on the same page.
        // this fetcher has access to a lot objects like Form, action, loader etc.

        // The reason we are using useFetcher  is so we can submit the NewsletterSignup form
        // The NewsletterSignup has a dedicated page  under the "Newsletter " tab 
        // and its also there permanently in the top-right corner.
        // For the NewsletterSignup in the page, we submit the form using react-dom Form and it will automatically
        // trigger the action attached to the route.
        // But for the NewsletterSignup in the top-left, it has no action attached to it, but we want to trigger same action as 
        // the route. This where useFetcher comes in.

        const fetcher = useFetcher();
        // the state below is the state of the loader/action that was triggered
        // data is the data returned by the action/loader attached to the /newsletter route
        const { data, state } = fetcher;
        console.log("data in NewsletterSignup: ", data)
        console.log("state in NewsletterSignup: ", state)

        useEffect(() => {
                if (state === 'idle' && data && data.message) {
                        window.alert(data.message);
                }
        }, [data, state]);

        return (
                // So with fetcher.Form we can hit the action that's attached to the /newsletter route
                // but it won't navigate us to that page
                <fetcher.Form
                        method="post"
                        action="/newsletter"
                        className={classes.newsletter}
                >
                        <input
                                type="email"
                                placeholder="Sign up for newsletter..."
                                aria-label="Sign up for newsletter"
                        />
                        <button>Sign up</button>
                </fetcher.Form>
        );
}

export default NewsletterSignup;