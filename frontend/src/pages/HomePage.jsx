import { Box, Typography, Grid2, Snackbar, Alert } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../Components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct } = useProductStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);

    setSnackbar({
      open: true,
      message: success
        ? "Product deleted successfully!"
        : message || "Failed to delete the product.",
      severity: success ? "success" : "error",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const typographyStyles = {
    margin: "2rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    fontWeight: 600,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", textAlign: "center" }}>
      <Typography component="h1" sx={{ ...typographyStyles, fontSize: "2rem" }}>
        Current Products
        <RocketLaunchIcon sx={{ ml: 1 }} />
      </Typography>

      <Grid2
        container
        spacing={3}
        columns={{ xs: 12, sm: 6, md: 12 }}
        sx={{ mt: 4 }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDeleteProduct={handleDeleteProduct} // Pass delete handler as prop
          />
        ))}
      </Grid2>

      {products.length === 0 && (
        <Typography sx={{ ...typographyStyles, mt: 4 }}>
          <Box
            component={Link}
            to="/addproduct"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Add a New Product
            <AddReactionIcon sx={{ ml: 1 }} />
          </Box>
        </Typography>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
