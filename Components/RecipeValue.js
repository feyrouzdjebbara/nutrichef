import React from 'react'
import styles from "../styles/ingredient.module.css";

function RecipeValue({ totalCalories, Carbohydrates,
    Protein, Fat, totalWeight, totalCholesterol,
    Sodium,
    Calcium,
    Magnesium,
    Potassium,
    Iron,
    Zinc,
    VitaminC,
    VitaminD }) {

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
                            <td>Sodium</td>
                            <td>{Sodium.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Calcium</td>
                            <td>{Calcium.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Magnesium</td>
                            <td>{Magnesium.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Potassium</td>
                            <td>{Potassium.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Iron</td>
                            <td>{Iron.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Zinc</td>
                            <td>{Zinc.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Vitamin C</td>
                            <td>{VitaminC.toFixed(1)} mg</td>
                        </tr>
                        <tr>
                            <td>Vitamin D (D2 + D3)</td>
                            <td>{VitaminD.toFixed(1)} µg</td>
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