import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const slicedData = data.slice(0, 10);

  const fetchTodoData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((todoData) => setData(todoData))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  return (
    <section className="px-10 py-6 space-y-4">
      <h1 className="text-2xl font-semibold">TODOs:</h1>
      <ol className="list-decimal list-inside space-y-3">
        {slicedData.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <span
              className={`${todo.completed ? "text-green-600" : "text-red-600"} font-semibold`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default App;
