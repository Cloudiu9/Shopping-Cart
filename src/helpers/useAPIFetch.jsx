import { useEffect, useState } from "react";

export default function useAPIFetch(randLower = 0, randUpper = 30) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // async
  useEffect(() => {
    async function getItems(url) {
      try {
        // reset to make sure it's empty
        setItems(null);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`There's been an issue: ${res.message}`);

        const data = await res.json();
        setItems(data.slice(randLower, randUpper)); // store all 20 items for now (id starts at 1)
      } catch (err) {
        setItems(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getItems("https://fakestoreapi.com/products");
  }, []);

  return { loading, items, error };
}
