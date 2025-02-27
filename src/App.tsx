import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}></Box>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProductForm />} />
          <Route path="/edit-product/:id" element={<EditProductForm />} />
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
