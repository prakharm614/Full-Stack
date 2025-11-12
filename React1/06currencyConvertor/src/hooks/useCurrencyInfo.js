import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
        );
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        const result = await response.json();
        setData(result[baseCurrency]); // updated structure
      } catch (err) {
        console.error("Error fetching currency data:", err);
        setError(err.message);
      }
    }

    fetchRates();
  }, [baseCurrency]);

  return { data, error };
}

export default useCurrencyInfo;
