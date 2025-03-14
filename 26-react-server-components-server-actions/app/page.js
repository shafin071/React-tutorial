// import DataFetchingDemo from '@/components/DataFetchingDemo';
// import ServerActionsDemo from '@/components/ServerActionsDemo';


// export default function Home() {
//         return (
//                 <main>
//                         {/* <DataFetchingDemo /> */}
//                         {/* <ServerActionsDemo /> */}
//                 </main>
//         );
// }


// This is the new page.js for the use() hook demo

import fs from 'node:fs/promises';

import { Suspense } from 'react';

import UsePromiseDemo from '@/components/UsePromisesDemo';
import ErrorBoundary from '@/components/ErrorBoundary';

// NOTE: home is a SSC, hence we can use the async decorator
export default async function Home() {

        // The setTimeout adds a delay while fetching the user data, meaning the page will load once the data is fetched.
        // NOTE: Promise is an object that represents the eventual completion (or failure) of an asynchronous operation, 
        // like fetching data from an API.
        const fetchUsersPromise = new Promise((resolve, reject) =>
                setTimeout(async () => {
                        const data = await fs.readFile('dummy-db.json', 'utf-8');
                        const users = JSON.parse(data);
                        // resolve(users);
                        reject(new Error('Error!')); // trigger an error
                }, 2000)
        );

        return (
                <main>
                        {/* UsePromiseDemo errors, the ErrorBoundary will show its fallback. 
                        ErrorBoundary works nicely with suspense */}
                        <ErrorBoundary fallback={<p>Something went wrong!</p>}>
                                {/* Suspense shows the fallback which is the loading users text while the data is being fetched. */}
                                <Suspense fallback={<p>Loading users...</p>}>
                                        <UsePromiseDemo usersPromise={fetchUsersPromise} />
                                </Suspense>
                        </ErrorBoundary>
                </main>
        );
}
