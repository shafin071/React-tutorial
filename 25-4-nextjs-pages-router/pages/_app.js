import Layout from '../components/layout/Layout';
import '../styles/globals.css';


// Root component
// Component, pageProps are passed to this component by NextJS.
// Component is the page/component holds the html content that will be rendered. 
// So this prop will change page to page as we navigate.
// pageProps are specific props that Component should be getting.
function MyApp({ Component, pageProps }) {
        return (
                <Layout>
                        <Component {...pageProps} />
                </Layout>
        );
}

export default MyApp;