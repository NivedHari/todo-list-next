import React, { useEffect, useState } from "react";
import TodoList from "@/components/Todo/TodoList";
import CompletedList from "@/components/Todo/CompletedList";

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {

    const savedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];
    setCompletedTodos(savedCompletedTodos);
  }, []);

  const deleteTodo = (id) => {
    const updatedCompletedTodos = completedTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));

  };

  return (
    <div>
      <h1>Completed Todos</h1>
      <CompletedList todos={completedTodos} deleteTodo={deleteTodo}/>
    </div>
  );
};

export default CompletedTodos;
