import { useRef } from 'react';
import classes from './TodoForm.module.css';

function TodoForm(props) {
  const todoRef = useRef();  
  const { addTodo } = props; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredTodo = todoRef.current.value; 
    addTodo(enteredTodo); 
    todoRef.current.value = ""; 
  };

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Todo"
          className={classes.inp}
          ref={todoRef}
        />
        <button type="submit">Submit</button> 
      </form>
    </div>
  );
}

export default TodoForm;
