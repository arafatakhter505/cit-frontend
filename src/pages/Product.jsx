import { Box, Container, Grid } from "@mui/material";
import { useContext } from "react";
import axios from "axios";
import dev from "../config";
import { useQuery } from "@tanstack/react-query";
import { AlertContext } from "../contextApi/AlertContextApi";
import { ProductCard, ProductLoading } from "../components";

const Product = () => {
  const { setAlertOpen, setSeverity, setAlertMessage } =
    useContext(AlertContext);
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${dev.serverUrl}/api/products`);
        const data = res.data.products;
        return data;
      } catch (error) {
        setAlertOpen(true);
        setSeverity("error");
        setAlertMessage(error.message);
      }
    },
  });

  return (
    <Container maxWidth={"lg"}>
      {isLoading ? (
        <ProductLoading />
      ) : (
        <Box sx={{ marginY: "50px" }}>
          <Grid container spacing={4}>
            {products?.map((product) => (
              <Grid key={product?._id} item xs={12} sm={6} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Product;
