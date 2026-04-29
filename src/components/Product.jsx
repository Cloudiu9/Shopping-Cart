import { useParams } from "react-router-dom";
import useAPIFetch from "../helpers/useAPIFetch";
import Star from "./Star";
import { useState } from "react";

export default function Product() {
  const { items } = useAPIFetch();

  //   https://www.theodinproject.com/lessons/node-path-react-new-react-router
  //  Need to use 'useParams'
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const ITEM = items && items[id - 1]; // -1 because item id is 1 more than useparams id

  // works, adds item in cart for each click
  // TODO display cart.length next to shop in navbar... how to pass it?
  // state needs to flow from parent to children, so I need to restructure this so it's received from Header, but then I also need it in cartpage?
  // solution ==> context
  function handleClick() {
    setCart([...cart, ITEM]);
  }

  return (
    <section
      className="py-8 bg-white md:py-12 dark:bg-gray-900 antialiased no-scrollbar"
      style={{ overflow: "hidden", height: "100%" }}
    >
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full hidden dark:block"
              src={items && ITEM.image}
              alt=""
              style={{ width: "360px", height: "auto" }}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {/* Need to render the TITLE of the CLICKED ITEM (same as URL/params) */}
              {items && ITEM.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {items && ITEM.price}$
              </p>

              {/* TODO Render stars dynamically based on rating (4.6 = 5 lit stars, 3.7 = 3 lit stars 2 unlit, get unlit star from shopcard? etc.) */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {/* got help for this :(  */}
                  {items && (
                    <>
                      {/* spreading 'undefined' over 'rating' number of array spaces (we don't care about the actual array, we just need that many stars) */}
                      {[...Array(Math.round(ITEM.rating.rate))].map(
                        (_, index) => (
                          <Star key={index} color="yellow" />
                        ),
                      )}

                      {/* empty stars: 5(total) - how many there actually are */}
                      {[...Array(5 - Math.round(ITEM.rating.rate))].map(
                        (_, index) => (
                          <Star key={index} />
                        ),
                      )}
                    </>
                  )}
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({items && ITEM.rating.rate})
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {items && ITEM.rating.count} Reviews
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {/* need to add onclick that stores the id of the item added in an array(?) */}
              <button
                onClick={handleClick}
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
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
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {items && ITEM.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
