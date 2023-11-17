import React, { useState, useEffect } from "react";
import "./index.css";
import ToDoItem from "./ToDoItem";

const ToDo = ({ firestore }) => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Попытка получить данные из локального хранилища
        const localTodos = JSON.parse(localStorage.getItem("todos"));

        if (localTodos) {
          setTodos(localTodos);
        } else {
          // Если данных в локальном хранилище нет, получаем их из Firestore
          const todoCollection = await firestore.collection("todos").get();
          const todosData = todoCollection.docs.map((doc) => ({
            ...doc.data(),
            _id: doc.id,
          }));

          // Сохраняем полученные данные в локальное хранилище
          localStorage.setItem("todos", JSON.stringify(todosData));

          setTodos(todosData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [firestore]);

  const onKeyDownNameHandler = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = { _id: todos.length, name, isChecked: false };

      // Используйте функцию обновления предыдущего состояния
      setTodos((prev) => [...prev, newTodo]);

      // Обновляем данные в локальном хранилище
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

      // Сохранение данных в Firebase
      await firestore.collection("todos").add(newTodo);

      // Очистка строки ввода
      setName("");
    }
  };

  const toggleChekedToDo = (_id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === _id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
    // Обновляем данные в локальном хранилище после изменения
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const removeToDo = (_id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== _id));
    // Обновляем данные в локальном хранилище после изменения
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <>
      <div className="container">
        <h1>ToDo List</h1>
        {todos &&
          todos.map((todo) => (
            <ToDoItem
              key={todo._id}
              name={todo.name}
              isChecked={todo.isChecked}
              toggleChekedToDo={() => toggleChekedToDo(todo._id)}
              removeToDo={() => removeToDo(todo._id)}
            />
          ))}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onKeyDownNameHandler}
          placeholder="Напиши задачу"
        />
      </div>
    </>
  );
};

export default ToDo;
