import { Container, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertContext } from "../contextApi/AlertContextApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dev from "../config";
import { CirclesWithBar } from "react-loader-spinner";
import { ProductImage, ProductInfo } from "../components";

const ProductDetails = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);

  const { setAlertOpen, setSeverity, setAlertMessage } =
    useContext(AlertContext);
  const { isLoading, data: product } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${dev.serverUrl}/api/products/${id}`);
        const data = res.data.product;
        setImages(data.images);
        return data;
      } catch (error) {
        setAlertOpen(true);
        setSeverity("error");
        setAlertMessage(error.message);
      }
    },
  });

  const handleImages = (color) => {
    const image = product?.images.filter((item) => item.color === color);
    setImages(image);
  };
  console.log(product);
  return (
    <Container maxWidth={"lg"} sx={{ marginY: "50px" }}>
      {isLoading ? (
        <Stack alignItems={"center"}>
          <CirclesWithBar
            height="200"
            width="200"
            color="#1976D2"
            outerCircleColor="#1976D2"
            innerCircleColor="#1976D2"
            barColor="#1976D2"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
          <ProductImage images={images} />
          <ProductInfo product={product} handleImages={handleImages} />
        </Stack>
      )}
    </Container>
  );
};

export default ProductDetails;
