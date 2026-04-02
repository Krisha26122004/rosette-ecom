import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { HomePage } from "./pages/Homepage.jsx";
import Cart from "./pages/Cart.jsx";
import Products from "./pages/Product.jsx";
import Orders from "./pages/Orders.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

function App() {

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<HomePage cart={cart} setCart={setCart} />} />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} />} />

        <Route path="/orders" element={<Orders orders={orders} />} />

        <Route path="/products/:category" element={<Products cart={cart} setCart={setCart} />} />

        <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
        
        <Route path="/about" element={<About cart={cart} />} />
        
        <Route path="/contact" element={<Contact cart={cart} />} />

      </Routes>



    </BrowserRouter>

  );
}

export default App;