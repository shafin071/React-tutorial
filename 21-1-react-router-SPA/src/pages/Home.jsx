import { Link, useNavigate } from 'react-router-dom';


function HomePage() {
        const navigate = useNavigate();

        // how to navigate programmatically
        function navigateHandler() {
                navigate('/products');
        }

        return (
                <>
                        <h1>My Home Page</h1>
                        <p>
                                {/* Link is preferred over href because href has default behavior of sending an HTTP request and reloading 
                                     the whole page again. This re-rendering all the React components which can become expensive for 
                                     large React projects.  */}
                                Go to <Link to="products">the list of products</Link>.
                        </p>
                        <p>
                                <button onClick={navigateHandler}>Navigate</button>
                        </p>
                </>
        );
}

export default HomePage;