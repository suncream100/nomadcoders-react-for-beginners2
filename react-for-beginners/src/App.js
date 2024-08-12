import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log(counter);
  return (
    <div>
      <h1 className={styles.title}>Welcome back!!! {counter}</h1>
      <button onClick={onClick}>클릭</button>
    </div>
  );
}

export default App;
