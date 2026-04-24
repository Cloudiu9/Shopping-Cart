import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div id="navbar">
      <Link to="/">HOME</Link>
      <Link to="/shop">SHOP</Link>
      <Link to="/cart">CART</Link>
    </div>
  );
}
