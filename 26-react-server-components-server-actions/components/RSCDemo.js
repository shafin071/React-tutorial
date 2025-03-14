// import ClientDemo from './ClientDemo';

// since this is a server-side component (SSC), its executed server-side. So the console log will not appear in the browser
// but in the terminal log of the IDE.
// So is this component considered server-side when its not explicitly defined to be so.
// Its because Next.js projects are set up such that all React components are rendered server-side by default. 

// Pros of server-side components: 
// 1. Code is executed in server side so client does not need to download all the code
//     to render this component, this improving the performance. 
// 2. We can do data-fetching on the server side and render the component with it. 
//     On client-side, the component has to wait on the data to finish executing, which adds delay to page load.
// 3. can use async/await.
 // NOTE: Special project setup is required for SSC. Bundler/buld workflow must be configured to support SSC.

 // SSC can directly include client-components in their JSX code

export default async function RSCDemo() {
        console.log('RSCDemo rendered');

        return (
                <div className="rsc">
                        <h2>A React Server Component</h2>
                        <p>
                                Will <strong>ONLY</strong> be rendered on the server or at build time.
                        </p>
                        <p>
                                <strong>NEVER</strong> on the client-side!
                        </p>
                        {/* <ClientDemo /> */}
                </div>
        );
}