import React from 'react'
import styles from "../styles/ingredient.module.css";

function IngredientsTable({error ,nutritionInfo, ingredientsArray}) {
  return (
    <>
{error && <p className={styles.error}>{error}</p>}
{nutritionInfo && nutritionInfo.length > 0 && (
  <table className={styles.table}>
    <thead>
      <tr >
        <th className={styles.th}>Ingredient</th>
        <th className={styles.th}>Weight (g)</th>
        <th className={styles.th}>Calories (kcal)</th>
      </tr>
    </thead>
    <tbody>
      {nutritionInfo.map((info, index) => (
        <tr key={index}>
          <td className={styles.td}>{ingredientsArray[index]}</td>
          <td className={styles.td}>{info.totalWeight.toFixed(1)}</td>
          <td className={styles.td}>{info.calories.toFixed(1)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

</>
  )
}

export default IngredientsTable