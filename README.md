# React Infinite Scroll Product Search App

Welcome to the React Infinite Scroll Product Search App! This application fetches product data from the [DummyJSON Product API](https://dummyjson.com/products) and displays items in sets of 20. Users can scroll to the bottom to fetch the next set of 20 items until all available items are displayed. Additionally, the app provides a search input box allowing users to search for products based on their query.

## Installation

To install and run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vivo1310/infinite-scrolling-app.git
   ```

2. Change directory to `infinite-scrolling-app` and install dependencies:

   ```bash
   npm install
   ```

## Running the App

To run the app locally, use the following command:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000) in your web browser.

## Features

### Infinite Scrolling

The app implements infinite scrolling to fetch the next set of 20 products when the user scrolls to the bottom of the product list.

### Product Search

The app provides a search input box where users can type queries. While typing, the app fetches products from the [DummyJSON Product Search API](https://dummyjson.com/products/search?q=phone) based on the user's input.

## Thought Process

### Infinite Scrolling

The implementation of infinite scrolling revolves around the decision-making process of when to trigger the `fetchProducts` function. This decision is based on calculating whether the user has reached the bottom of the product list. To manage this calculation, a custom hook called [`useInfiniteScroll.ts`](./src/hooks/useInfiniteScroll.ts)
 has been created. This hook encapsulates the logic for detecting when the user has scrolled to the bottom and is utilized within a `useEffect` block.

### Product Search

Introducing the product search feature required additional consideration. Manual testing was conducted to ensure that products displayed match the user's query. A parameter called "query" (type: string) was added to the `fetchProducts` function to differentiate between fetching the next set of products and fetching products based on a user's search query.

```javascript
if (query === "") {
  response = await axios.get(
    `${API_URL}?limit=${limit}&skip=${skip}&select=${selectFields}`
  );
} else {
  setProducts([]); // Clear existing products when searching
  response = await axios.get(
    `${API_URL}/search?q=${query}&limit=${limit}`
  );
}
```

This ensures that the correct API endpoint is called based on the presence of a search query.


## Considerations

- **Optimized API Calls:** To enhance the app's performance, the implementation includes a mechanism to prevent unnecessary API calls when all available products have been fetched and displayed. The total number of products is tracked and utilized in the infinite scroll mechanism to determine whether additional calls are needed.

    Example:

    ```javascript
    // Inside the fetchProducts function
    const fetchProducts = async (query: string) => {
        try {
            // API calling to get the response
            const total = response.data.total; 
            setTotalProducts(total);
        }
      // the rest of try-catch block
    };

    // Inside the useInfiniteScroll hook
    useInfiniteScroll(() => {
        if (products.length < totalProducts) {
            // Prevent calling API when already fetched and displayed all available products
            fetchProducts(searchQuery);
        }
    }, [loading, error, products, totalProducts]);
    ```

- **Styling:** The project follows a visually appealing design with the help of Material UI. The use of Material UI components ensures a consistent and responsive user interface. 

- **Framework Choice:** I chose to develop the application using React as it aligns with my current skill set and experience. However, I am open to learning new technologies and, if given more time, I would explore creating the project using Vue JS. This would not only demonstrate my proficiency in React but also showcase my ability to adapt to different frameworks and technologies.

## Contact Information

For any questions or inquiries related to this coding test, please contact Vi via vptv1310@gmail.com.
