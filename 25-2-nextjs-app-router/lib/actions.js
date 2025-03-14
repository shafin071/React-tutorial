'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';


function isInvalidText(text) {
        return !text || text.trim() === '';
}

// Since this form-action is used with useFormState hook in meals/share/page.js 
// useFormState passes two objects to shareMeal
// prevState: previous response of the form-action. Initially it'll be { message: null } set in useFormState.
export async function shareMeal(prevState, formData) {
        const meal = {
                title: formData.get('title'),
                summary: formData.get('summary'),
                instructions: formData.get('instructions'),
                image: formData.get('image'),
                creator: formData.get('name'),
                creator_email: formData.get('email'),
        };

        if (
                isInvalidText(meal.title) ||
                isInvalidText(meal.summary) ||
                isInvalidText(meal.instructions) ||
                isInvalidText(meal.creator) ||
                isInvalidText(meal.creator_email) ||
                !meal.creator_email.includes('@') ||
                !meal.image ||
                meal.image.size === 0
        ) {
                return {
                        message: 'Invalid input.',
                };
        }

        await saveMeal(meal);

        // invalidate the meal items cache in /meals so the newly added meals in shown

        // BACKGROUND: when the nextjs project is built for production by running 'npm run build' and then 'npm start'
        // You'll notice .next folder in the root dir. The built project goes into that folder. 
        // It has all the built files that'll be served by the production server.
        // NextJS production server automatically pre-generates all the pages and caches them to improve page load performance.
        // Therefore, we must invalidate the page cache to show latest data.

        // NOTE: invalidating the /meal page will only invalidate the cache for that page, it will not do so for the subfolder pages.
        // revalidatePath takes a 2nd arg which is js file which needs to be invalidated. If you specify 'page.js', then it'll only 
        // invalidate meals page.js. However if you specify 'layout.js' then all the pages in the subfolder will be invalidated as well
        // since layout.js wraps the meals/page.js and all the pages in the sub-folders.
        // For example, if you want invalidate the cache for the entire project, do revalidatePath('/', 'layout');

        revalidatePath('/meals');
        redirect('/meals');
}