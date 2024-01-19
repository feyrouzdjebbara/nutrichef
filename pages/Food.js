import React, { useState } from 'react';

const API_ID = 'e650a326';
const API_KEY = 'b228c94c157228910f4ef25503d303a3';

function Food() {
  const [ingredient, setIngredient] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleNutritionAnalysis = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${API_ID}&app_key=${API_KEY}&ingr=${ingredient}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setNutritionInfo(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNutritionInfo(null);
      setError('Error fetching nutrition information. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleNutritionAnalysis}>
        <label htmlFor="ingredient">Enter an ingredient:</label>
        <textarea
          type="text"
          id="ingredient"
          name="ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          required
        />
        
        <button type="submit">Get Nutrition Information</button>
      </form>

      {error && <p>{error}</p>}

      {nutritionInfo && (
        <div>
        <h2>Nutrition Information for {ingredient}:</h2>
          <p>Calories: {nutritionInfo.calories} kcal</p>
          <p>Carbohydrates: {nutritionInfo.totalNutrients.CHOCDF.quantity} {nutritionInfo.totalNutrients.CHOCDF.unit}</p>
          <p>Protein: {nutritionInfo.totalNutrients.PROCNT.quantity} {nutritionInfo.totalNutrients.PROCNT.unit}</p>
          <p>Fat: {nutritionInfo.totalNutrients.FAT.quantity} {nutritionInfo.totalNutrients.FAT.unit}</p>
          <p>Total Weight: {nutritionInfo.totalWeight} {nutritionInfo.totalNutrients.FAT.unit}</p>
          
        </div>
      )}
    </>
  );
}

export default Food;
