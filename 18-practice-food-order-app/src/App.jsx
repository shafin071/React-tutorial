import {
        useQuery,
        useMutation,
        useQueryClient,
        QueryClient,
        QueryClientProvider,
} from '@tanstack/react-query'

import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import FoodMenu from './components/FoodMenu.jsx';
import Header from './components/Header.jsx';
import OrderSuccess from './components/OrderSuccess.jsx';
import CartContextProvider from './store/FoodCartContext.jsx'
import UserProgressContextProvider from './store/UserProgressContext.jsx';


// Create a client
const queryClient = new QueryClient()


function App() {
        return (
                // Provide the client to your App
                <QueryClientProvider client={queryClient}>
                        <UserProgressContextProvider>
                                <CartContextProvider>
                                        <Header />
                                        <FoodMenu />
                                        <Checkout />
                                        <OrderSuccess />
                                        <Cart />
                                </CartContextProvider>
                        </UserProgressContextProvider>
                </QueryClientProvider>

        );
}

export default App;
