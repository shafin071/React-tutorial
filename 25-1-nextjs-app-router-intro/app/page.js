import Link from 'next/link';

// the @ sign in the import means the project root.
// and the @ sign is configued to do so in jsconfig.json file.
import Header from '@/components/header';


// layout.js and page.js are resrved filenames for next js
// this Home component is a React component but its treated in the special way by NextJS
// meaning the component is rendered on the server-side and not on your browser.
// So if you add a console log in here, you won't see anything printed in the browser console. It actually printed in the backend logs.
export default function Home() {
        return (
                <main>
                        <Header />
                        <p>🔥 Let&apos;s get started! 🔥</p>
                        <p><Link href="/about">About Us</Link></p>
                </main>
        );
}


// Important: The filenames are only reserved when creating them inside of the app/ folder (or any subfolder). 
// Outside of the app/ folder, these filenames are not treated in any special way.

// Here's a list of reserved filenames in NextJS - you'll, of course, learn about the important ones throughout this section:

// page.js => Create a new page (e.g., app/about/page.js creates a <your-domain>/about page)
// layout.js => Create a new layout that wraps sibling and nested pages
// not-found.js => Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
// error.js => Fallback page for other errors (thrown by sibling pages or nested pages or layouts)
// loading.js => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
// route.js => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)
