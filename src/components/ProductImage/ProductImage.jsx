import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const ProductImage = ({ images }) => {
  const [viewImage, setViewImage] = useState(images[0]);
  useEffect(() => {
    setViewImage(images[0]);
  }, [images]);

  return (
    <Box width={{ xs: "100%", sm: "30%" }}>
      <Box>
        <img src={viewImage?.url} alt="product" style={{ width: "100%" }} />
      </Box>
      <Stack direction={"row"} spacing={2}>
        {images?.map((image) => (
          <img
            key={image?.url}
            src={image?.url}
            alt="product"
            onClick={() => setViewImage(image)}
            style={{ width: "70px", cursor: "pointer" }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ProductImage;
