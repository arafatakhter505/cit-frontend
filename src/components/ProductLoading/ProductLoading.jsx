import { Box, Grid, Skeleton } from "@mui/material";

const ProductLoading = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 6];
  return (
    <Box sx={{ marginTop: "50px" }}>
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid key={item} item xs={12} sm={6} lg={3}>
            <Box>
              <Skeleton
                variant="rectangular"
                height={118}
                sx={{ width: "100%", mb: "10px" }}
              />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductLoading;
