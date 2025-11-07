import { Route, Routes } from "react-router-dom";
import { Landing } from "./components/Landing";
import { MenuList } from "./components/MenuList";
import { RestaurantList } from "./components/RestaurantList";
import { AddToCart } from "./components/AddToCart";
import { CartProvider } from "./store/createCart";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="collection/:city/:locat" element={<MenuList />} />
        <Route
          path="restaurants/:city/:locat/:id/:menuName"
          element={<RestaurantList />}
        />
        <Route
          path="/cart/:city/:locat/:id/:menuName/:resId"
          element={<AddToCart />}
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
