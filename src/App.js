import { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTask, setNewTask] = useState("");

  const addHandler = () => {
    setAdd(!add);
  };

  const inputHandler = (e) => {
    setNewTask(e.target.value);
  };

  const fetchTodoData = (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: newTask,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((todoData) => {
        setData((prevTodos) => [...prevTodos, { ...todoData, id: Date.now() }]);
      })
      .catch((error) => console.log(error));
  };

  console.log(data);

  return (
    <section className="px-10 py-6 space-y-4">
      <h1 className="text-2xl font-semibold">TODOs:</h1>

      <button
        onClick={addHandler}
        className="py-1 px-4 border border-black rounded-md"
      >
        Add
      </button>

      {add && (
        <div>
          <form>
            <label>Add Task: </label>
            <input
              value={newTask}
              onInput={inputHandler}
              type="text"
              className="border border-black rounded-sm px-2 py-0.5"
              placeholder="Task..."
            ></input>
            <button
              type="submit"
              onClick={fetchTodoData}
              className="py-1 px-4 border border-black rounded-md"
            >
              Create
            </button>
          </form>
        </div>
      )}
      {/* <ol className="list-decimal list-inside space-y-3">
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <span
              className={`${
                todo.completed ? "text-green-600" : "text-red-600"
              } font-semibold`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ol> */}
      {data.length >= 1 &&
        data.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <span
              className={`${
                todo.completed ? "text-green-600" : "text-red-600"
              } font-semibold`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
    </section>
  );
};

export default App;
