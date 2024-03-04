import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Box, TextField, Typography } from "@mui/material";
import ProductList, { Product } from "./components/ProductList";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const API_URL = "https://dummyjson.com/products";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState<number>(0); // Track total number of products

  /**
   * FETCH PRODUCTS
   */
  const fetchProducts = async (query: string) => {
    try {
      setLoading(true);
      const skip = products.length; // Calculate skip based on the length of existing products
      const selectFields = "id,title,price,description,thumbnail,brand"; // Adjust based on the fields in your updated Product interface
      let response: AxiosResponse;
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
      const total = response.data.total; // Calculate total number of products
      setTotalProducts(total); // Update total number of products

      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ]);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts("");
  }, []); // initial fetch product when page first load

  useInfiniteScroll(() => {
    if (products.length < totalProducts && !loading) {
      // Prevent calling api when already fetch and display all available products
      fetchProducts(searchQuery);
    }
    // eslint-disable-next-line
  }, [loading, error, products, totalProducts, searchQuery]);

  /**
   * SEARCH PRODUCTS
   */
  const searchProducts = async (input: string) => {
    setProducts([]); // Clear existing products when searching
    await fetchProducts(input);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInput = event.target.value;
    setSearchQuery(userInput);
    searchProducts(userInput); // Trigger searchProducts function when user types
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        onChange={handleSearchInputChange}
        style={{ marginBottom: "16px" }}
      />
      <ProductList products={products} loading={loading} />
      {error && (
        <Typography
          variant="body1"
          color="error"
          style={{ textAlign: "center", padding: "16px" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default App;
