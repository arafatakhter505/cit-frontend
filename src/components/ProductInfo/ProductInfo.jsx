import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AuthContext } from "../../contextApi/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "../../contextApi/AlertContextApi";
import dev from "../../config";

const ProductInfo = ({ product, handleImages }) => {
  const { setAlertOpen, setSeverity, setAlertMessage } =
    useContext(AlertContext);
  const { authUser } = useContext(AuthContext);
  const [price, setPrice] = useState(product?.price[0].amount);
  const [size, setSize] = useState(product?.sizes[0]);
  const [color, setColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSize = (event, activeSize) => {
    setSize(activeSize);
    const activePrice = product?.price.find((item) => {
      if (item.size.indexOf(activeSize) > -1) {
        return item;
      }
    });
    setPrice(activePrice.amount);
  };

  const handleColor = (event) => {
    setColor(event);
    handleImages(event);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!authUser?._id) {
      navigate("/login", { replace: true });
      return;
    }
    const cart = {
      userId: authUser?._id,
      items: [
        {
          productId: product?._id,
          quantity,
          color,
          size,
        },
      ],
    };
    try {
      const response = await axios.post(`${dev.serverUrl}/api/carts/add`, cart);
      if (response.data.success) {
        setAlertOpen(true);
        setSeverity("success");
        setAlertMessage(response.data.message);
      }
    } catch (error) {
      setAlertOpen(true);
      setSeverity("error");
      setAlertMessage(error.message);
    }
  };

  return (
    <Box width={{ xs: "100%", sm: "70%" }}>
      <Typography variant="h5">{product?.title}</Typography>
      <Typography variant="h5" sx={{ mt: "20px" }}>
        Price: ${price}
      </Typography>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={4}
        sx={{ mt: "20px" }}
      >
        <Typography variant="h5">Size:</Typography>
        <ToggleButtonGroup value={size} exclusive onChange={handleSize}>
          {product?.sizes.map((item) => (
            <ToggleButton key={item} value={item} sx={{ px: 2 }}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={4}
        sx={{ mt: "20px" }}
      >
        <Typography variant="h5">Color:</Typography>
        <Stack direction={"row"} spacing={2}>
          {product?.colors.map((item) => (
            <Box
              key={item}
              onClick={() => handleColor(item)}
              sx={{
                width: color === item ? 40 : 30,
                height: color === item ? 40 : 30,
                borderRadius: "50%",
                backgroundColor: `#${item}`,
                cursor: "pointer",
                border: "1px solid gray",
              }}
            ></Box>
          ))}
        </Stack>
      </Stack>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        sx={{ mt: 5 }}
      >
        <Button onClick={handleDecrease} sx={{ fontSize: 20 }}>
          -
        </Button>
        <TextField
          value={quantity}
          InputProps={{
            readOnly: true,
          }}
          sx={{ width: "60px" }}
        />
        <Button onClick={handleIncrease} sx={{ fontSize: 20 }}>
          +
        </Button>
      </ButtonGroup>
      <Box>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{ fontWeight: "bold", mt: 5 }}
          startIcon={<AddShoppingCartIcon />}
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
