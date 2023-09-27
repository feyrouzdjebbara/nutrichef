import React from 'react';
import styles from "../styles/filter.module.css";

const ExpenseFilter = ({ expenseNameFilter, handleExpenseNameFilterChange, handleFilterExpensesBytitle ,categoryFilter, handleFilterCategory}) => {
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
      
      <select
      className={styles.category}
      value={categoryFilter}
      onChange={(e) => {
        handleFilterCategory(e.target.value);
      }}
    >
      <option value="">All</option>
      <option value="Food">Food</option>
      <option value="Bills">Bills</option>
      <option value="Travel">Travel</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Transportation">Transportation</option>
      <option value="Other">Other</option>
    </select>
</div>
   


  );
};

export default ExpenseFilter;
