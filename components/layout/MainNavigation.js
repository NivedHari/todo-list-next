import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>To-Do</div>
      
    </header>
  );
}

export default MainNavigation;
