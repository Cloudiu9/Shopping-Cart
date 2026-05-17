import { Link } from "react-router-dom";
import useAPIFetch from "../helpers/useAPIFetch";
import SkeletonShopPage from "../pages/SkeletonShopPage";
import useCart from "../context/cartContext";
import Toast from "./Toast";
import { useState } from "react";

export default function ShopCard() {
  const [showToast, setShowToast] = useState(false);

  const { loading, items, error } = useAPIFetch();

  // need to get id from clicked card instead, there's no ID in the URL for useParams()
  // const { id } = useParams();

  const { addToCart } = useCart();

  function handleAddItem(key) {
    const item = items && items[key - 1]; // -1 because item id is 1 more than item id
    addToCart(item);

    // Close toast after 1.5s
    setTimeout(() => {
      setShowToast(false);
    }, 1500);

    // Show success toast
    setShowToast(true);
  }

  return (
    // Responsive grid: automatically wraps items to a new row when they can't maintain a minimum width of 320px. (used help)
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-1 dark:bg-gray-900 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {loading && <SkeletonShopPage />}
      {error && <h2>Error! {error}</h2>}

      {/* https://flowbite.com/docs/components/card/ */}
      {items &&
        items.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full max-w-sm bg-neutral-primary-soft p-4 border border-default rounded-base shadow-xs text-[rgb(31,39,141)]"
            >
              {showToast && <Toast />}
              <div>
                <div className="flex items-center space-x-3 mb-6 text-white">
                  <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                    <svg
                      className="w-5 h-5 text-fg-yellow"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* star */}
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>{" "}
                    {item.rating.rate}
                  </span>
                </div>
                {/* https://stackoverflow.com/questions/71010211/react-route-to-a-specific-product-details-page-from-a-product-page */}
                <Link to={`/shop/${item.id}`}>
                  <div className="flex items-center justify-center">
                    <img
                      src={item.image}
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                </Link>
                <div className="flex items-center justify-between mt-6 text-white">
                  <span className="text-3xl font-extrabold text-heading">
                    {item.price}$
                  </span>
                  <button
                    onClick={() => handleAddItem(item.id)}
                    type="button"
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
