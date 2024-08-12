import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    console.log("deps가 비어있으면 한번만 실행");
  }, []);
  useEffect(() => {
    console.log("keyword값이 변경될 때마다 실행");
  }, [keyword]);
  useEffect(() => {
    console.log("counter값이 변경될 때마다 실행");
  }, [counter]);
  useEffect(() => {
    console.log("keyword와 counter값이 변경될 때마다 실행");
  }, [keyword, counter]);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("call the api...", keyword);
    }
  }, [keyword]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search here..."
        value={keyword}
        onChange={onChange}
      />
      <h1 className={styles.title}>Welcome back!!! {counter}</h1>
      <button onClick={onClick}>클릭</button>
    </div>
  );
}

export default App;
