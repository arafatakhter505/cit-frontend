import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Link to={`/product-details/${product?._id}`}>
        <CardMedia
          component="img"
          alt="product"
          image={product?.images[0].url}
        />
      </Link>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Link
            style={{ color: "#000", textDecoration: "none" }}
            to={`/product-details/${product?._id}`}
          >
            {product?.title.length > 30
              ? product?.title.slice(0, 30) + "....."
              : product?.title}
          </Link>
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
          <Typography component="h3" variant="h6" color="primary">
            Price: ${product?.price[0].amount}
          </Typography>
          <Link to={`/product-details/${product?._id}`}>
            <Button sx={{ fontWeight: "bold", p: "0" }}>More Info</Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
