// use this later for better styling: https://readymadeui.com/tailwind-ecommerce/shopping-cart

import { useState, useMemo } from "react";
import useCart from "../context/cartContext";
import Toast from "./Toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [showToast, setShowToast] = useState(false);

  const { cart, setCart } = useCart();

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price, 0).toFixed(2),
    [cart],
  );

  function handleCheckout() {
    setCart([]);

    // Close toast after 1.5s
    setTimeout(() => {
      setShowToast(false);
    }, 1500);

    // Show success toast
    setShowToast(true);
  }

  return (
    <div className="flex flex-col items-center text-white gap-2 text-md">
      {cart.length === 0 && (
        <>
          <h1 className="text-xl text-bold">Add some items to your cart!</h1>
          <Link to="/shop" className="mt-4 text-blue-400 underline">
            Back to shop
          </Link>
        </>
      )}

      <ul className="max-w-2xl flex flex-col justify-end">
        {cart &&
          cart.map((item, idx) => {
            return (
              // gap between items to increase min distance from img to text (Samsung 49-inch monitor)
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-800 my-2 px-4 py-1 gap-10"
              >
                <Link to={`/shop/${item.id}`} className="">
                  <div className="p-1.5">
                    <img
                      src={item.image}
                      style={{
                        minWidth: "80px",
                        maxWidth: "80px",
                        minHeight: "100px",
                        maxHeight: "100px",
                      }}
                    />
                  </div>
                </Link>
                <li>{item.title}</li>
                <li>${item.price}</li>
              </li>
            );
          })}
      </ul>

      {cart.length > 0 && (
        <>
          <div className="text-xl font-semibold border-t border-gray-600 pt-4 w-full max-w-2xl text-right">
            Total: ${totalPrice}
          </div>
          <button
            onClick={handleCheckout}
            className="transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/20 inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 border-[rgb(31,39,141)] cursor-pointer hover:"
          >
            Checkout
          </button>
        </>
      )}
      {showToast && <Toast status="checkout" />}
    </div>
  );
}
