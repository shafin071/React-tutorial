import { useParams, Link } from 'react-router-dom';


function ProductDetailPage() {
        // useParams is a React-Router hook
        // It gives us the params object which contains every dynamic path segment defined in the route
        // So in our case, you can get the :productId defined in the route.
        const params = useParams();

        return (
                <>
                        <h1>Product Details!</h1>
                        <p>{params.productId}</p>
                        {/* .. means go back up one level based on the value of relative property. relative can be path or aboslute
                        path: /product/productId will go back to /product 
                        absolute: /product/productId will go back to root since /product/productId is a child route of root*/}
                        <p><Link to=".." relative='path'>Back</Link></p>
                </>
        );
}

export default ProductDetailPage;