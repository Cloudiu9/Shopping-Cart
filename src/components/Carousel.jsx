import { useRef, useEffect, useState } from "react";
import useAPIFetch from "../helpers/useAPIFetch";

export default function Carousel() {
  // used help with this
  const [range] = useState(() => {
    const lower = Math.floor(Math.random() * 10); // 0-9

    // minUpper is at least 5 ==> min 5 images get fetched
    const minUpper = lower + 5;
    const upper = Math.floor(Math.random() * (30 - minUpper)) + minUpper;

    return { lower, upper };
  });

  const { loading, items, error } = useAPIFetch(range.lower, range.upper);

  // used help with this
  const scrollRef = useRef(null);

  // Logic to handle the infinite "jump"
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, offsetWidth } = container;

    // If we are at the clone of the LAST item (at the very start)
    if (scrollLeft <= 0) {
      container.scrollTo({
        left: offsetWidth * items.length,
        behavior: "instant",
      });
    }
    // If we are at the clone of the FIRST item (at the very end)
    else if (scrollLeft >= offsetWidth * items.length + 1) {
      container.scrollTo({ left: offsetWidth, behavior: "smooth" });
    }
  };

  // Initial position: Start at the "real" first item, not the clone
  useEffect(() => {
    if (!loading && items && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.offsetWidth,
        behavior: "instant",
      });
    }
  }, [loading, items]);

  if (loading) return <div>Loading...</div>;
  if (error) return <h2>Error! {error}</h2>;

  // 1. Clone the last item and put it first
  // 2. Clone the first item and put it last
  const displayItems = [items[items.length - 1], ...items, items[0]];

  function handleClick(direction) {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;

    if (direction === "left") container.scrollLeft -= scrollAmount;
    else container.scrollLeft += scrollAmount;
  }

  // used help for this
  return (
    <div className="relative w-full pb-30 pt-30 dark:bg-gray-900">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-center w-full flex-shrink-0 snap-center relative"
          >
            <img
              src={item.image}
              alt={`Slide ${index}`}
              style={{ width: "400px", height: "350px" }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => handleClick("left")}
        className="arrow left-arrow"
        id="left"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 10 16"
        >
          <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
        </svg>
      </button>
      <button
        onClick={() => handleClick("right")}
        className="arrow right-arrow"
        id="right"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 10 16"
        >
          <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
        </svg>
      </button>
    </div>
  );
}
