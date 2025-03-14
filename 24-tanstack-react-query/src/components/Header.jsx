import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {
        // Now, fetching will be a number that's zero if React Query is not fetching any data
        // at this point of time anywhere in the application, or a higher number if React Query is fetching data.
        const fetching = useIsFetching();
        return (
                <>
                        <div id="main-header-loading">{fetching > 0 && <progress />}</div>
                        <header id="main-header">
                                <div id="header-title">
                                        <h1>React Events</h1>
                                </div>
                                <nav>{children}</nav>
                        </header>
                </>
        );
}