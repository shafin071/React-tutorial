'use client';  // this directive makes the component to be rendered in the browser

import { useState } from 'react';

// Why use client-side components (CSC) if there are so many pros of using server-side (SSC)?
// because you might need to use some client component feature in your component.
// Like for example, the useState() or useEffect() hook.

// NOTE: now CSC do get executed on the server-side because some pages gets rendered once the project is built
// Vite only supports CSC.
// CSC can't directly use SSC in their code. Only as children.

export default function ClientDemo({ children }) {
        const [count, setCount] = useState(0); // <- this is why it's a client component

        console.log('ClientDemo rendered');
        return (
                <div className="client-cmp">
                        <h2>A React Client Component</h2>
                        <p>
                                Will be rendered on the client <strong>AND</strong> the server.
                        </p>
                        {children}

                        {/* you can use your SSC here like this and it will not throw an error, but RSCDemo will get executed 
                             like its a CSC. However if you add an async to the function: 
                              default async function RSCDemo()
                              Then you'll see an error because async is a server side feature.  */}
                        {/* <RSCDemo /> */}
                </div>
        );
}