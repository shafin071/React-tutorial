import { Suspense } from 'react';
import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';


export const metadata = {
        title: 'All Meals',
        description: 'Browse the delicious meals shared by our vibrant community.',
      };
      

async function Meals() {
        const meals = await getMeals();  // returns a promise
        return <MealsGrid meals={meals} />;
}

// Server components can be initaited as async. export default function MealsPage
// But the async can be removed since we are moving the meal fetch outside of the component.
// Its done so we can wrap the data fetching with Suspense.
// NOTE: NextJS can cache a page
export default function MealsPage() {
        return (
                <>
                        <header className={classes.header}>
                                <h1>
                                        Delicious meals, created{' '}
                                        <span className={classes.highlight}>by you</span>
                                </h1>
                                <p>
                                        Choose your favorite recipe and cook it yourself. It is easy and fun!
                                </p>
                                <p className={classes.cta}>
                                        <Link href="/meals/share">Share Your Favorite Recipe</Link>
                                </p>
                        </header>
                        <main className={classes.main}>

                        {/* Suspense is a component provided by React that allows you to handle loading states 
                        and show fallback content until some data or resource has been loaded. */}
                                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                                        <Meals />
                                </Suspense>
                                
                        </main>
                </>
        );
}