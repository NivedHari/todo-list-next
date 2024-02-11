import { MongoClient } from "mongodb";
import React, { useState, useEffect } from "react";
import TodoList from "../components/Todo/TodoList";
import TodoForm from "../components/Todo/TodoForm";

function Home(props) {
 
  const addTodo = async (todoData) => {

    const response = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify(todoData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    console.log(data);
  };

  const toggleTodo = (id) => {
    // const updatedTodos = todos.map((todo) =>
    //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
    // );

    // const completedTodo = updatedTodos.find((todo) => todo.id === id);

    // setTodos(updatedTodos);

    // if (completedTodo) {
    //   const updatedCompletedTodos = [...completedTodos, completedTodo];
    //   setCompletedTodos(updatedCompletedTodos);

    //   setTodos(updatedTodos.filter((todo) => todo.id !== id));
    // }
  };

  const deleteTodo = (id) => {
    // const updatedTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <TodoList todos={props.todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export async function getStaticProps() {
    const client = new MongoClient(
      "mongodb+srv://nived123:nived123@todos.uoqfzyb.mongodb.net/?retryWrites=true&w=majority"
    );
    await client.connect();
    const db = client.db();
    const todosCollection = db.collection("todos");
  
    const todos = await todosCollection.find().toArray();
  
    client.close();
  
    return {
      props: {
        todos: todos.map((todo) => ({
          text:todo.text,
          completed:todo.completed,
          id: todo._id.toString(),
        })),
      },
      revalidate: 1,
    };
  }

export default Home;
