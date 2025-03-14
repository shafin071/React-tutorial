'use client';

import { useFormStatus } from 'react-dom';


// Purpose of this component is to render the button text according to meal/share form status
export default function MealsFormSubmit() {
        // Hook that gives you status information of the last form submission.
        const { pending } = useFormStatus();

        return (
                <button disabled={pending}>
                        {pending ? 'Submitting...' : 'Share Meal'}
                </button>
        );
}