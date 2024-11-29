import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./Components/AppBar";
import HomePage from './pages/HomePage';
import AddProduct from './pages/AddProduct';
import { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false); // Manages dark mode state

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

        <ResponsiveAppBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addproduct" element={<AddProduct darkMode={darkMode} />} />
        </Routes>

    </ThemeProvider>
  );
}

export default App;
