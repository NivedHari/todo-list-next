import { MongoClient } from "mongodb";
import TodoList from "../components/Todo/TodoList";
import TodoForm from "../components/Todo/TodoForm";
import { useRouter } from "next/router";
import classes from "@/components/layout/Layout.module.css";

function Home(props) {
  const todoList = props.todos.filter((todo) => todo.completed === false);
  const router = useRouter();

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

  const toggleTodo = async (id) => {
    const todoItem = props.todos.find((todo) => todo.id === id);
    const updatedTodo = {
      id: todoItem.id,
      completed: true,
    };
    try {
      const response = await fetch(`/api/new-todo`, {
        method: "PUT",
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

  const deleteTodo = async (id) => {
    const todoItem = props.todos.find((todo) => todo.id === id);
    const updatedTodo = {
      id: todoItem.id,
      completed: true,
    };
    try {
      const response = await fetch(`/api/new-todo`, {
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

  const goToCompleted = () => {
    router.push("/completed");
  };

  return (
    <div>
      <TodoList
        todos={todoList}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
      <TodoForm addTodo={addTodo} />
      <button className={classes.completeBtn} onClick={goToCompleted}>
        Go to Completed Todos
      </button>
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
        text: todo.text,
        completed: todo.completed,
        id: todo._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default Home;
