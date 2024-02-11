import CompletedItem from "./CompletedItem";

const CompletedList = ({ todos, deleteTodo }) => {
  return (
    <ul>
      {todos &&
        todos.map((todo) => (
          <CompletedItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
    </ul>
  );
};

export default CompletedList;
