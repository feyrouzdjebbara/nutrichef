import React from 'react'
import styles from "../styles/home.module.css";
export default function Header({selectedOption,handleSelectChange,expensesSum,expensesMonth,TotalYearExpenses}) {
  return (
    <header className={styles.header}>
    <div className={styles.count}>
  <div className={styles.periodcount}>
          <select
        className={styles.periodselect}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="totalExpenses">Total Expenses</option>
        <option value="thisMonth">This Month</option>
        <option value="thisYear">This Year</option>
      </select>

  </div>
  <div className={styles.containerTotal}>
  <div  className={styles.containerexin}>
  { selectedOption === 'totalExpenses' ? (
      <p>Expenses: <br/>  {expensesSum} DZD</p>
    ) : selectedOption === 'thisMonth' ? (
      <p>Expenses: <br/> {expensesMonth} DZD</p>
    ) : selectedOption === 'thisYear' ? (
      <p>Expenses: <br/> {TotalYearExpenses} DZD</p>
    ) : null } 
   
    </div>
  </div>

  <div className={styles.containerTotal} >
  <div className={styles.containerIncome}>
    { selectedOption === 'totalExpenses' ? (
      <p>Incomes: <br/>  {expensesSum} DZD</p>
    ) : selectedOption === 'thisMonth' ? (
      <p>Incomes: <br/> {expensesMonth} DZD</p>
    ) : selectedOption === 'thisYear' ? (
      <p>Incomes: <br/> {TotalYearExpenses} DZD</p>
    ) : null }
    
  </div>
  </div>
  </div>

    </header>
  )
}
