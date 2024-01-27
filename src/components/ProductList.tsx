import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  Typography,
} from "@mui/material";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  brand: string;
}

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  return (
    <List>
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={product.thumbnail}
            title={product.title}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography component="span" variant="body2" color="textPrimary">
                {`${product.brand} - $${product.price}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
      {loading && (
        <div style={{ textAlign: "center", padding: "16px" }}>
          <CircularProgress />
        </div>
      )}
    </List>
  );
};

export default ProductList;
