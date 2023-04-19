import { useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

export default function Todo({ item, onUpdate, onDelete }) {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  const [isEdit, setIsEdit] = useState(false);
  function FormEdit() {
    function handleSubmit(e) {
      e.preventDefault();
    }

    const [newValue, setNewValue] = useState(item.title);
    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value);
    }
    function handleClickUpdateTodo() {
      onUpdate(item.id, newValue);
      setIsEdit(false);
    }
    return (
      <form className="todoUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoInput"
          onChange={handleChange}
          value={newValue}
        />
        <button className="button" onClick={handleClickUpdateTodo}>
          Update
        </button>
      </form>
    );
  }

  function TodoElement() {
    return (
      <div className="todoInfo">
        <span className="todoTitle">{item.title}</span>
        <div className="btn-container">
        <button className="button" onClick={() => setIsEdit(true)}>
          Editar
        </button>
        <button
          className="buttonDelete"
          onClick={(e) => {
            onDelete(item.id);
          }}
        >
          Eliminar
        </button>
        </div>
      </div>
    );
  }

  return <div className="todo" data-aos="zoom-in">{isEdit ? <FormEdit /> : <TodoElement />}</div>;
}
