
export async function fetchFoodMenu() {
        const response = await fetch('http://localhost:3000/meals');
        const resData = await response.json();
        if (!response.ok) {
                throw new Error('Failed to fetch food menu');
        }
        return resData;
}

export async function postFoodOrder(order) {
        console.log("order in postFoodOrder: ", order)
        const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                body: JSON.stringify({ order }),
                headers: {
                        'Content-Type': 'application/json',
                },
        });
        const resData = await response.json();
        if (!response.ok) {
                throw new Error('Failed to update food order.');
        }
        return resData.message;
}