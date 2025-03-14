'use client';

// error.js is another special filename that is used to show error messages if there's an issue while loading the page.
// This Error component takes an error object which shows what the error is.
export default function Error({error}) {
        console.log("error: ", error)
        return (
                <main className="error">
                        <h1>An error occurred!</h1>
                        <p>Failed to fetch meal data. Please try again later.</p>
                </main>
        );
}