import React from "react";

const ToDoItem = ({ _id, name, isChecked, toggleChekedToDo, removeToDo }) => {
  return (
    <div className="todo-item" onClick={() => toggleChekedToDo(_id)}>
      <input type="checkbox" checked={isChecked} />
      <span className="name">{name}</span>
      <button onClick={() => removeToDo(_id)}>Удалить</button>
    </div>
  );
};

export default ToDoItem;
