import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { useProductStore } from "../store/product.js";

function AddProduct({ darkMode }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // Can be 'success', 'error', 'warning', 'info'
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddProduct = async (event) => {
    event.preventDefault(); // Prevent form submission refresh
    const { success, message } = await createProduct(newProduct);

    // Show a snackbar based on the result
    setSnackbar({
      open: true,
      message: success
        ? "Product added successfully!"
        : message || "Failed to add product.",
      severity: success ? "success" : "error",
    });

    // Reset the form fields if successful
    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, margin: "15% auto", padding: "16px" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Add Product
          </Typography>
          <Box component="form" onSubmit={handleAddProduct}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: darkMode ? "white" : "blue" }}
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

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
    </Container>
  );
}

AddProduct.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default AddProduct;
