import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos(currentArray => [toDo, ...currentArray])
    setToDo("");
  }
  return (
    <div>
      <h1>🐶 나의 할 일 ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="할 일을 작성해주세요." value={toDo} onChange={onChange} />
        <button>추가</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
