import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "../views/Users/HomePage";
import ProductPage from "../views/Users/ProductPage";
import CartPage from "../views/Users/CartPage";
import NavBar from "../components/Users/Navbar";

export default function UserRoutes() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const handleRemove = (id) => setCart(cart.filter((item) => item.id !== id));

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  function UserLayout() {
    return (
      <div>
        <NavBar cartCount={cartCount} />
        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          }
        />
      </Route>
    </Routes>
  );
}
