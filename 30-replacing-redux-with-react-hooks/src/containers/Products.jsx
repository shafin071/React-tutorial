import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';


export default function Products({prod}) {
        const productList = useSelector(state => state.shop.products);
        return (
                <ul className="products-list">
                        {productList.map(prod => (
                                <ProductItem
                                        key={prod.id}
                                        id={prod.id}
                                        title={prod.title}
                                        description={prod.description}
                                        isFav={prod.isFavorite}
                                />
                        ))}
                </ul>
        );
};
