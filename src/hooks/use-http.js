import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

// const [foodList, setFoodList] = useState([]);
// const { isLoading, error, sendRequest: fetchFoodItems } = useHttp();

// useEffect(() => {
//   const transformFoodItems = (foodItemsObject) => {
//     const loadedFoods = [];

//     for (const foodKey in foodItemsObject) {
//       loadedFoods.push({
//         id: foodKey,
//         name: foodItemsObject[foodKey].name,
//         description: foodItemsObject[foodKey].description,
//         price: foodItemsObject[foodKey].price,
//       });
//     }

//     setFoodList(loadedFoods);
//   };

//   fetchFoodItems(
//     {
//       url: 'https://food-app-70bfd-default-rtdb.firebaseio.com/meals.json',
//     },
//     transformFoodItems
//   );
// }, [fetchFoodItems]);
