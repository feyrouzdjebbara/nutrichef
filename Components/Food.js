import React, { useState } from 'react';
import styles from "../styles/food.module.css";
import IngredientsTable from './IngredientsTable';
import RecipeValue from './RecipeValue';


const API_ID = 'e650a326';
const API_KEY = 'b228c94c157228910f4ef25503d303a3';

function Food() {
  const [ingredient, setIngredient] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [error, setError] = useState(null);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [totalCalories, settotalCalories] = useState(0)
  const [Carbohydrates, settotalCarbohydrates] = useState(0)
  const [Fat, settotalFat] = useState(0)
  const [Protein, settotalProtein] = useState(0)
  const [totalWeight, settotalWeight] = useState(0)
  const [totalCholesterol, setCholesterol] = useState(0)
  
  const handleNutritionAnalysis = async (e) => {
    e.preventDefault();

    try {
      // Split ingredients by commas and trim spaces
      const ingredients = ingredient.split(',').map((item) => item.trim());

      const promises = ingredients.map(async (ingredient) => {
        const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${API_ID}&app_key=${API_KEY}&ingr=${ingredient}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      });

      const data = await Promise.all(promises);

      setNutritionInfo(data);
      setIngredientsArray(ingredients);
      setError(null);
      const newTotalCalories = data
        ? data.reduce((sum, info) => sum + info.calories, 0)
        : 0;
      settotalCalories(newTotalCalories);

      const newCarbohydrates = data
      ? data.reduce((sum, info) => sum + info.totalNutrients.CHOCDF.quantity, 0)
      : 0;
    settotalCalories(newTotalCalories);

      settotalCarbohydrates(newCarbohydrates)

      const newFat = data
      ? data.reduce((sum, info) => sum + info.totalNutrients.FAT.quantity, 0)
      : 0;
    settotalCalories(newTotalCalories);

      settotalFat(newFat)

      const newPrtein = data
      ? data.reduce((sum, info) => sum + info.totalNutrients.PROCNT.quantity, 0)
      : 0;
    settotalCalories(newTotalCalories);

      settotalProtein(newPrtein)

      const newtotalWeight = data
      ? data.reduce((sum, info) => sum + info.totalWeight, 0)
      : 0;
    settotalWeight(newtotalWeight);

      

      const newCholesterol = data
      ? data.reduce((sum, info) => sum + info.totalNutrients.CHOLE.quantity, 0)
      : 0;
      setCholesterol(newCholesterol)

     
    } catch (error) {
      console.error('Error fetching data:', error);
      setNutritionInfo(null);
      setIngredientsArray([]);



      setError('Error fetching nutrition information. Please try again.');
    }
  };

  return (
    <>
      <div className={styles.container} >
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleNutritionAnalysis}>
            <label
              className={styles.label}
              htmlFor="ingredient">Enter ingredients (comma-separated)</label>
            <textarea
              className={styles.textarea}
              type="text"
              id="ingredient"
              name="ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              required
            />
            <button
              className={styles.button}
              type="submit">Analyze</button>
          </form>

          <IngredientsTable
            error={error}
            nutritionInfo={nutritionInfo}
            ingredientsArray={ingredientsArray}
          />



        </div>
        <RecipeValue
          totalCalories={totalCalories}
          Carbohydrates={Carbohydrates}
          Protein={Protein}
          Fat={Fat}
          totalWeight={totalWeight}
          totalCholesterol={totalCholesterol}
        />
      </div>
    </>
  );
}

export default Food;
