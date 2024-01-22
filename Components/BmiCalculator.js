import React from 'react'

function BmiCalculator({bmi1,goal1,calorieNedded}) {
  return (
    <>
    {bmi1 &&
        <div>
          <h3>BMI: {bmi1.data.bmi}</h3>
          
          <h3>Healthy BMI Range: {bmi1.data.healthy_bmi_range}</h3>
          <h3>You are in: {bmi1.data.health}</h3>
          <h3>Your goal is to {goal1} </h3>
          <h3>You need {calorieNedded} calories per day</h3>

        </div>
      }
      </>
  )
}

export default BmiCalculator