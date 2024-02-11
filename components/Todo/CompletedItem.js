import classes from "./TodoItem.module.css";

const CompletedItem = ({ todo, deleteTodo }) => {
  return (
    <li className={classes.item}>
      <div>
        <span>{todo.text}</span>
      </div>
      <div>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default CompletedItem;
