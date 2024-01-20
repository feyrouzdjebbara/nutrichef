import React from 'react'
import styles from "../styles/ingredient.module.css";

function RecipeValue({totalCalories,Carbohydrates,Protein,Fat,totalWeight,totalCholesterol}) {

    return (
        <>
<div className={styles.verticalBlock}>
  <h2>Nutrition Information for this recipe:</h2>
  <table className={styles.nutritionTable}>
    <thead>
      <tr>
        <th >Nutrient</th>
        <th>Amount (g)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Total Calories</td>
        <td><strong>{totalCalories.toFixed(1)}</strong> kcal</td>
      </tr>
      <tr>
        <td>Carbohydrates</td>
        <td>{Carbohydrates.toFixed(1)} g</td>
      </tr>
      <tr>
        <td>Protein</td>
        <td>{Protein.toFixed(1)} g</td>
      </tr>
      <tr>
        <td>Fat</td>
        <td>{Fat.toFixed(1)} g</td>
      </tr>
      <tr>
        <td>Cholesterol</td>
        <td>{totalCholesterol.toFixed(1)} mg</td>
      </tr>
      <tr>
        <td>Total Weight</td>
        <td>{totalWeight.toFixed(1)} g</td>
      </tr>
    </tbody>
  </table>
</div>
</>
  )
}

export default RecipeValue