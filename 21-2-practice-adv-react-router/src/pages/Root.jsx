import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
        // useNavigation can tell us the state of the route transition
        // It has a built in state that holds the trasition status as a string 
        // const navigation = useNavigation();

        return (
                <>
                        <MainNavigation />
                        <main>
                                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                                <Outlet />
                        </main>
                </>
        );
}

export default RootLayout;