import React from 'react';
import styles from "../styles/filter.module.css";

const ExpenseFilter = ({ expenseNameFilter, handleExpenseNameFilterChange, handleFilterExpensesBytitle}) => {
  return (
    
    <div  className={styles.search}>
      <input
        type="text"
        id="expenseNameFilter"
        name="expenseNameFilter"
        value={expenseNameFilter}
        onChange={handleExpenseNameFilterChange}
        placeholder="Search expense by title"
        className={styles.searchTerm}
        onKeyPress={(e) => {
      if (e.key === 'Enter') {
        handleFilterExpensesBytitle();
      }
    }}
      />
      <button className={styles.searchButton} onClick={handleFilterExpensesBytitle}>
         <i class="fa fa-search"></i>
      </button>
      
</div>
   


  );
};

export default ExpenseFilter;
