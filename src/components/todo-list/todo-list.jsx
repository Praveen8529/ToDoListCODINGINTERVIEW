import * as React from "react";
import { Checkbox } from "../checkbox";
import { TodosContext } from "../../todo-context";
import "./todo-list.scss";

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  //console.log(todos, setTodos);
  const handleDelete = (id) => {
    // Fix an ability to delete task
    setTodos(todos.filter((item) => item.id !== id));
  };

  const toggleCheck = (id) => {
    // Fix an ability to toggle task
    let updatedChecked = todos.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : { ...item };
    });
    setTodos(updatedChecked);
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re absolutely free today!
        </div>
      )}
    </div>
  );
};
