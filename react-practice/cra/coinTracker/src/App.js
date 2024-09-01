import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
    .then((res) => res.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, [])
  return (
    <div>
      <h1>🚀 암호화폐 🚀</h1>
      { loading ? <strong>🪙🪙🪙...</strong> : null }
      <ul>
        {coins.map((item, index) => (
          <li key={index}>
            <strong>{item.name}({item.symbol}) : </strong>
            <span>${item.quotes.USD.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
