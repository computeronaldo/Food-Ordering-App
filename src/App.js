import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import { CartContextProvider } from "./store/cart-context";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <CartContextProvider>
        {showModal && <Cart closeModal={() => setShowModal(false)} />}
        <Header openModal={() => setShowModal(true)} />
        <main>
          <Meals />
        </main>
      </CartContextProvider>
    </>
  );
}

export default App;
