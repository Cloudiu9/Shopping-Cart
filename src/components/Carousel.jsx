import { useRef, useEffect } from "react";
import useAPIFetch from "../helpers/useAPIFetch";

export default function Carousel() {
  const { loading, items, error } = useAPIFetch(5);

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
    else if (scrollLeft >= offsetWidth * (items.length + 1)) {
      container.scrollTo({ left: offsetWidth, behavior: "instant" });
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

  // used help for this
  return (
    <div className="relative w-full">
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
    </div>
  );
}
