import Cart from "../components/Cart";
import Header from "../components/Header";

export default function CartPage() {
  // Need to hold state with all items added to cart (on productpage: user clicks 'add to cart')
  // ==> increments 'items in cart' by 1
  // CartPage shows all items in cart and price and a dummy checkout button

  // wrap it with CartContext?

  return (
    <div id="cart">
      <Header />

      <Cart />
    </div>
  );
}
