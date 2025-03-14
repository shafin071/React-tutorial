import {
        createBrowserRouter,
        // createRoutesFromElements,
        RouterProvider,
        // Route,
} from 'react-router-dom';

import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetail';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );

const router = createBrowserRouter([

        // We created a nav-link wrapper RootLayout that has the all the router links as children.
        // Thw wrapper has the MainNavigation component and an Outlet
        // By using a wrapper we can apply things like CSS to the wrapper.
        // You can have multiple RootLayouts in a project. So we could have an admin RootLayout that has a children of admin-elated routes.
        // NOTE: errorElement does not go into the Outlet, it has its own element.
        {
                // child routes NOT starting with '/' is a relative path
                // child routes will be /products
                path: '/',

                // RootLayout has the MainNavigation component and the outlet
                //  HomePage will be the default outlet
                element: <RootLayout />,   
                errorElement: <ErrorPage />,
                children: [
                        // index: true defines the same route behavior as path: ''
                        // its another way of saying that this is the default route. Meaning if the URL is just "/", then load <HomePage />
                        { index: true, element: <HomePage /> },
                        // { path: '', element: <HomePage /> },
                        { path: 'products', element: <ProductsPage /> },
                        { path: 'products/:productId', element: <ProductDetailPage /> }
                ],

                // path: '/',
                // element: <RootLayout />,
                // errorElement: <ErrorPage />,
                // child routes starting with '/' is an obsolute path
                // children: [
                //         { path: '/', element: <HomePage /> },
                //         { path: '/products', element: <ProductsPage /> },
                //         { path: '/products/:productId', element: <ProductDetailPage /> }
                // ],
        }
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
        return <RouterProvider router={router} />;
}

export default App;
