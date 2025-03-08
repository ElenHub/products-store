import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Header />
        <Container component="main" maxWidth="lg" flex="1"> 
          <Box sx={{ my: 4 }}></Box>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/create-product" element={<CreateProductForm />} />
            <Route path="/edit-product/:id" element={<EditProductForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
        <Footer />
    </Router>
  );
}
export default App;