import classes from './loading.module.css';


// loading.js is another special file name. It has the code that'll be executed when the page is loading.
// this loading will apply to the page in this folder as well the ones in the subfolder.
// Behind the scene, loading.js is wrapping the page.js component with Suspense.
// Since we are now using the Suspense functionality inside meals/page.js, we no longer need this loading.js
// so we renamed it to something else so it doesn't have the special loading functionality anymore.
export default function MealsLoadingPage() {
        return <p className={classes.loading}>Fetching meals...</p>;
}