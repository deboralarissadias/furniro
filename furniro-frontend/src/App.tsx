import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import SingleProduct from './pages/single-product/single-product';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:id/:sku/:slug" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
