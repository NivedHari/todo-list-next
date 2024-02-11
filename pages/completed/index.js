import { MongoClient } from "mongodb";

import CompletedList from "@/components/Todo/CompletedList";

const CompletedTodos = (props) => {
  const completedTodoList = props.todos.filter(
    (todo) => todo.completed === true
  );

  const deleteTodo = async (id) => {
    const todoItem = props.todos.find((todo) => todo.id === id);
    const updatedTodo = {
      id: todoItem.id,
    };
    try {
      const response = await fetch('/api/new-todo', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>Completed Todos</h1>
      <CompletedList todos={completedTodoList} deleteTodo={deleteTodo} />
    </div>
  );
};

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
        text: todo.text,
        completed: todo.completed,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default CompletedTodos;
