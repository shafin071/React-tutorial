'use client';

import { useState, use } from 'react';

// The use() hook can be used for getting to Context but it is a feature developed by the React team 
// that allows you to read values from Promises or to wait for Promises to resolve in client components 
// without using async/await.
// But it actually only works with special kinds of Promises, not with any random Promise you might create in your code.
// Instead, this use() hook only wants to work with Promises that are in the end created by libraries.

// It also works together with Suspense, a component offered by React that helps you with showing a loader/spinner 
// whilst data is being fetched.

// Thankfully, Next.js actually gives you a way of creating such Promises.
// UsePromiseDemo receives a usersPromise from Home in app/page.js
// UsePromiseDemo is CSC since it uses state.
// The of using the usestate counter is to demo how you can use the use hook to resolve the promise from a SSC (Home).

export default function UsePromiseDemo({ usersPromise }) {
        const users = use(usersPromise);   // wait for the promise to resolve i.e wait for user data to be fetched.
        const [count, setCount] = useState(0);
        return (
                <div className="rsc">
                        <h2>RSC with Data Fetching</h2>
                        <p>
                                Uses <strong>async / await</strong> for data fetching.
                        </p>
                        <p>
                                <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                                        Increment
                                </button>
                                <span>{count}</span>
                        </p>
                        <ul>
                                {users.map((user) => (
                                        <li key={user.id}>
                                                {user.name} ({user.title})
                                        </li>
                                ))}
                        </ul>
                </div>
        );
}