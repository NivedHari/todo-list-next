import React, { useState, useEffect } from "react";
import TodoList from "../components/Todo/TodoList";
import TodoForm from "../components/Todo/TodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }

    const storedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos"));
    if (storedCompletedTodos) {
      setCompletedTodos(storedCompletedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  
    const completedTodo = updatedTodos.find((todo) => todo.id === id);
  
    setTodos(updatedTodos);
  
    if (completedTodo) {
      const updatedCompletedTodos = [...completedTodos, completedTodo];
      setCompletedTodos(updatedCompletedTodos);
  

      setTodos(updatedTodos.filter((todo) => todo.id !== id));
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <TodoForm addTodo={addTodo} />
    </div>
  );
}
