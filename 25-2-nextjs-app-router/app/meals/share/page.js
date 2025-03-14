
// NOTE:  NextJS is smart enough to not confuse /meals/share with meals/[mealSlug]
// any string other than 'shared' will be treated as [mealSlug]

'use client';  // since we're using useFormState hook

import { useFormState } from 'react-dom';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';


export default function ShareMealPage() {

        // async function shareMeal(formData) {
        //          // this directive creates a server action
        //          // meaning this function will be executed on the server.
        //          // to make it a server action we need to add async to the function. 
        //          // The function will automatically receive a formData object because its assigned to the form action.
        //         // NOTE: you cannot use 'use client' and 'use server' in the same file.
        //         // So we will isolate this server action in its own file.
        //         'use server';  

        //         const meal = {
        //                 title: formData.get('title'),
        //                 summary: formData.get('summary'),
        //                 instructions: formData.get('instructions'),
        //                 image: formData.get('image'),
        //                 creator: formData.get('name'),
        //                 creator_email: formData.get('email')
        //         }

        //         console.log(meal);  // this log will get printed in the server side terminal
        // }

        // This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level.
        // useFormState takes 2 args: form-action and initial return object expected from the form-action.
        // status is the current object returned from form-action, which is initially { message: null }
        // formAction holds the form-action shareMeal
        const [state, formAction] = useFormState(shareMeal, { message: null });

        return (
                <>
                        <header className={classes.header}>
                                <h1>
                                        Share your <span className={classes.highlight}>favorite meal</span>
                                </h1>
                                <p>Or any other meal you feel needs sharing!</p>
                        </header>
                        <main className={classes.main}>
                                <form className={classes.form} action={formAction}>
                                        <div className={classes.row}>
                                                <p>
                                                        <label htmlFor="name">Your name</label>
                                                        <input type="text" id="name" name="name" required />
                                                </p>
                                                <p>
                                                        <label htmlFor="email">Your email</label>
                                                        <input type="email" id="email" name="email" required />
                                                </p>
                                        </div>
                                        <p>
                                                <label htmlFor="title">Title</label>
                                                <input type="text" id="title" name="title" required />
                                        </p>
                                        <p>
                                                <label htmlFor="summary">Short Summary</label>
                                                <input type="text" id="summary" name="summary" required />
                                        </p>
                                        <p>
                                                <label htmlFor="instructions">Instructions</label>
                                                <textarea
                                                        id="instructions"
                                                        name="instructions"
                                                        rows="10"
                                                        required
                                                ></textarea>
                                        </p>
                                        <ImagePicker label="Your image" name="image" />
                                        {state.message && <p>{state.message}</p>}
                                        <p className={classes.actions}>
                                                <MealsFormSubmit />
                                        </p>
                                </form>
                        </main>
                </>
        );
}