import classes from "./TodoItem.module.css";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className={classes.item}>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </span>
      </div>
      <div>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
