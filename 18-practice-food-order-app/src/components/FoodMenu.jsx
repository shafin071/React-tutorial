import { useQuery } from '@tanstack/react-query';

import { fetchFoodMenu } from '../apiClient';
import Error from './Error.jsx';
import Food from './Food';


export default function FoodMenu() {

        const { isError, isSuccess, isLoading, data, error } = useQuery({
                queryKey: ['food'],
                queryFn: fetchFoodMenu
        });

        if (isLoading) {
                return (
                        <div className="fetching-food-menu">
                                <h2>Fetching meals...</h2>
                        </div>
                )
        }

        if (error) {
                return <Error title="Failed to fetch meals" message="There was an error while fetching the food menu." />;
        }


        return (
                <ul id="meals">
                        {data && data.map((meal) => <Food key={meal.id} meal={meal} />)}
                </ul>
        );
}