// use this later for better styling: https://readymadeui.com/tailwind-ecommerce/shopping-cart

import useCart from "../context/cartContext";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="flex justify-center flex-col items-center text-white gap-2 text-md">
      {cart.length === 0 && <h1>Add some items to your cart!</h1>}
      <ul>
        {cart &&
          cart.map((item, idx) => {
            return (
              <div key={idx} className="flex justify-start items-center gap-4">
                <div className="p-1.5">
                  <img src={item.image} style={{ width: "60px" }} />
                </div>
                <li>{item.title}</li>
                <li>${item.price}</li>
              </div>
            );
          })}
      </ul>

      <button className="transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/20 inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 border-[rgb(31,39,141)] cursor-pointer hover:">
        Checkout
      </button>
    </div>
  );
}
