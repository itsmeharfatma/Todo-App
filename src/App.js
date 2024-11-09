import { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
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
      .catch((error) => console.error(error));
  };

  const deleteHandler = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        setData((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // console.log(data);

  return (
    <section className="px-10 py-8 space-y-6 h-screen bg-[#181717] fontStyle">
      <div className="flex">
        <h1 className="font-semibold text-transparent text-3xl md:text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
          Todo App
        </h1>
      </div>

      <div>
        <form className="relative w-full max-w-md">
          <input
            value={newTask}
            onInput={addTask}
            type="search"
            className="rounded-md py-3 pl-4 pr-20 bg-[#2e2e2e] block w-full appearance-none"
            placeholder="Task name"
          ></input>
          <button
            type="submit"
            onClick={fetchTodoData}
            className="absolute right-0 top-0 mt-1.5 mr-1.5 py-1.5 px-4 rounded-md font-semibold text-[#fafafa] bg-[#151515]"
          >
            Add
          </button>
        </form>
      </div>

      {data.length >= 1 &&
        data.map((todo) => (
          <li key={todo.id} className="text-gray-300">
            {todo.title}{" "}
            <button
              className="text-red-500 font-semibold"
              onClick={() => deleteHandler(todo.id)}
            >
              <i className="far fa-trash-can"></i>
            </button>
          </li>
        ))}
    </section>
  );
};

export default App;
