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
        setData((prevTodos) => [
          ...prevTodos,
          { ...todoData, id: Date.now(), isDone: false },
        ]);
      })
      .catch((error) => console.error(error));
    setNewTask("");
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

  const taskDoneHandler = (id) => {
    setData((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // console.log(data);

  return (
    <section className="px-10 py-8 h-screen bg-[#181717] fontStyle">
      <div className="md:w-1/3 mx-auto h-full no-scrollbar overflow-y-scroll">
        <div className="sticky top-0">
          <h1 className="font-semibold text-transparent text-3xl md:text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
            Todo App
          </h1>

          <div>
            <form className="relative w-full max-w-sm mt-6 mb-10">
              <input
                value={newTask}
                onInput={addTask}
                type="search"
                className="rounded-md py-3 pl-4 pr-20 text-gray-300 bg-[#2e2e2e] block w-full appearance-none focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Task name"
              ></input>
              <button
                type="submit"
                onClick={fetchTodoData}
                className="absolute right-0 top-0 mt-1.5 mr-1.5 py-1.5 px-4 rounded-md font-semibold text-[#fafafa] bg-[#151515]"
                disabled={!newTask}
              >
                Add
              </button>
            </form>
          </div>
        </div>

        {data.length >= 1 &&
          data.map((todo) => (
            <div
              key={todo.id}
              className="flex max-w-sm justify-between items-center text-lg mb-5 border-gray-600 border-b border-dashed pb-4"
            >
              <div className="flex gap-3 items-center">
                <button onClick={() => taskDoneHandler(todo.id)}>
                  {todo.isDone ? (
                    <i className="fas fa-circle-check text-green-700"></i>
                  ) : (
                    <i className="far fa-circle text-green-700"></i>
                  )}
                </button>

                <p
                  className={`text-gray-300 ${
                    todo.isDone ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}{" "}
                </p>
              </div>

              <button
                className="text-red-500 font-semibold"
                onClick={() => deleteHandler(todo.id)}
              >
                <i className="far fa-trash-can"></i>
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default App;
