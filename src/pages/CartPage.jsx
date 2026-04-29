import Header from "../components/Header";

export default function CartPage() {
  // Need to hold state with all items added to cart (on productpage: user clicks 'add to cart')
  // ==> increments 'items in cart' by 1
  // CartPage shows all items in cart and price and a dummy checkout button
  return (
    <div id="cart">
      <Header />

      <h2>Items in cart:</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>

      <button>Checkout</button>
    </div>
  );
}
