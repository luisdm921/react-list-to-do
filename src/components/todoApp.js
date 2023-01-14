import { useState } from "react";
import Todo from "./todo";
import './todoApp.css'

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();


    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const temp = [...todos];
    temp.unshift(newTodo);
    setTodos(temp);

    setTitle("");
  }

  function handleDelete(id){
    const temp = todos.filter(item => item.id !== id);
    setTodos(temp);
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => (item.id === id));
    item.title = value;
    setTodos(temp);
  }

  return (
    <div className="todoContainer">
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="todoInput"
          value={title}
        />
        <input
          onClick={handleSubmit}
          className="buttonCreate"
          type="submit"
          value="Create to-do"
        />
      </form>
      <div className="todosContainer">
        {todos.map((item) => (
          <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}></Todo>
        ))}
      </div>
    </div>
  );
}
