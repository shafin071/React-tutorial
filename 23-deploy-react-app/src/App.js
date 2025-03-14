import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';


// this is a way of lazy-loading/dynamically importing the components
// import returns a promise
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));


// React app build and deploy:
// stop the app and run npm run build
// this creates a build folder in your root dir
// this is the build folder that'll be deployed to the server.
// The folder has all the assets as static file like the optimized JS files which are compiled from the JSX code.
// Remember: since these are all static files, they will not be executed by the server. They will be executed by the browser.
// The project is deployed to firebase. Follow the video for step-by-step guide
// firebase deploy to launch site
// firebase hosting:disable to take it down
// the project ios deployed as a single-page application, so client-side routing is used. 
// Meaning all the routing logic is executed on the browser, the request does not to a server. 

// Lazy loading:
// When doing traditional component imports, all the imports need to be evaluated first before
// the App component is loaded. Which can become expensive for big production-grade projects.
// Lazy loading loads a component dynamically only when its needed.
// To see lazy loading in action, checkout the network tab in browser console. Compare how a component is 
// normally loaded vs lazy-loaded.
const router = createBrowserRouter([
        {
                path: '/',
                element: <RootLayout />,
                children: [
                        {
                                index: true,
                                element: <HomePage />,
                        },
                        {
                                path: 'posts',
                                children: [
                                        {
                                                index: true,
                                                element: (
                                                        // As we are lazy loading the component, we must wrap it in Suspense
                                                        // since the code for this component won't be loaded right away
                                                        <Suspense fallback={<p>Loading...</p>}>
                                                                <BlogPage />
                                                        </Suspense>
                                                ),
                                                loader: () =>
                                                        // import returns a promise object which is the loaded module
                                                        // then we run the loader of the route 
                                                        import('./pages/Blog').then((module) => module.loader()),
                                        },
                                        {
                                                path: ':id',
                                                element: (
                                                        <Suspense fallback={<p>Loading...</p>}>
                                                                <PostPage />
                                                        </Suspense>
                                                ),
                                                // meta is a object the loader recieves from react-router
                                                // it contains the params which is the input arg for the loader action.
                                                loader: (meta) =>
                                                        import('./pages/Post').then((module) => module.loader(meta)),
                                        },
                                ],
                        },
                ],
        },
]);

function App() {
        return <RouterProvider router={router} />;
}

export default App;
