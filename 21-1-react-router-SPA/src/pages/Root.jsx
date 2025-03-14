import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
        return (
                <>
                        <MainNavigation />
                        <main >
                                {/* Outlet component marks the place where the child route components should be rendered */}
                                <Outlet />
                        </main>
                </>
        );
}

export default RootLayout;