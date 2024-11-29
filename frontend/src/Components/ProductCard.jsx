/* eslint-disable react/prop-types */
import {
    Box,
    Tooltip,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Snackbar,
    Alert,
  } from "@mui/material";
  import UpgradeIcon from "@mui/icons-material/Upgrade";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import { blue, red } from "@mui/material/colors";
  import { useState } from "react";
  import { useProductStore } from "../store/product";
  
  const ProductCard = ({ product, onDeleteProduct }) => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
      name: product.name,
      price: product.price,
      image: product.image,
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" }); // Snackbar state
  
    const { updateProduct } = useProductStore();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setFormValues({
        name: product.name,
        price: product.price,
        image: product.image,
      });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSnackbarClose = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    };
  
    const handleSubmit = async () => {
      try {
        await updateProduct(product._id, formValues);
        setSnackbar({
          open: true,
          message: "Product updated successfully!",
          severity: "success",
        });
        setOpen(false); // Close dialog after successful update
      } catch (error) {
        console.error("Error updating product:", error);
        setSnackbar({
          open: true,
          message: "Failed to update product.",
          severity: "error",
        });
      }
    };
  
    return (
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: "8px",
          overflow: "hidden",
          transition: "all 0.3s",
          width: { xs: "100%", sm: "45%", md: "30%" },
          margin: "1rem auto",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
          }}
        />
        <Box sx={{ padding: "1rem" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "left",
              mb: 0.5,
            }}
          >
            {product.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "left",
              color: "text.secondary",
            }}
          >
            ${product.price}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Update Item">
              <IconButton onClick={handleClickOpen}>
                <UpgradeIcon sx={{ color: blue[500] }} />
              </IconButton>
            </Tooltip>
  
            <Tooltip title="Delete Item">
              <IconButton onClick={() => onDeleteProduct(product._id)}>
                <DeleteForeverIcon sx={{ color: red[500] }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
  
        {/* Dialog for Updating Product */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Product</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Product Name"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.name}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Product Price"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.price}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="image"
              name="image"
              label="Product Image URL"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.image}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" type="button">
              Update
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Snackbar for Feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
  
  export default ProductCard;
  