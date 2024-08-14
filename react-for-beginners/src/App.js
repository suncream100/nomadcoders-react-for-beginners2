import { useState, useEffect } from "react";
function Hello() {
  // function byeFn() {
  //   console.log("destroyed :(");
  // }
  // function hiFn() {
  //   console.log("created :)");
  //   return byeFn;
  // }
  // useEffect(hiFn, [])
  useEffect(() => {
    console.log("created :)");
    return () => console.log("destroyed :(");
  },[])
  return <h1>Hello</h1>
}
function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      <button onClick={onClick}>{showing ? "hide" : "show"}</button>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;
