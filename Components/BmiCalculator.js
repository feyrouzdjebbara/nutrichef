import React, { useEffect, useState } from 'react';
import styles from "../styles/bmi.module.css";
function BmiCalculator({ weight, height }) {
  const [bmi, setBMI] = useState();
  const [goal, setGoal] = useState("");
  const [healthyBMIRange, sethealthyBMIRange] = useState("");
 
    //BMI
    useEffect(() => {
      const bmiCalcule = weight / ((height / 100) * (height / 100));
      setBMI(bmiCalcule);
    }, [weight, height]);
  
    // Update healthy BMI range based on the calculated BMI
    useEffect(() => {
      if (bmi !== null) {
        if (bmi < 16) {
          sethealthyBMIRange('Severe Thinness');
        } else if (bmi < 17) {
          sethealthyBMIRange('Moderate Thinness');
        } else if (bmi < 18.5) {
          sethealthyBMIRange('Mild Thinness');
        } else if (bmi < 25) {
          sethealthyBMIRange('Normal weight');
        } else if (bmi < 30) {
          sethealthyBMIRange('Overweight');
        } else if (bmi < 35) {
          sethealthyBMIRange('Obese Class I');
        } else if (bmi < 40) {
          sethealthyBMIRange('Obese Class II');
        } else {
          sethealthyBMIRange('Obese Class III');
        }
      }
    }, [bmi]);
  
    // Update goal based on the healthy BMI range
    useEffect(() => {
      switch (healthyBMIRange) {
        case 'Severe Thinness':
          setGoal('Extreme weight gain');
          break;
        case 'Moderate Thinness':
          setGoal('Weight gain');
          break;
        case 'Mild Thinness':
          setGoal('Mild weight gain');
          break;
        case 'Normal weight':
          setGoal('maintain weight');
          break;
        case 'Overweight':
          setGoal('Mild weight loss');
          break;
        case 'Obese Class I':
          setGoal('Weight loss');
          break;
        case 'Obese Class II':
          setGoal('Extreme weight loss');
          break;
        case 'Obese Class III':
          setGoal('Extreme weight loss');
          break;
        default:
          setGoal('');
          break;
      }
    }, [healthyBMIRange]);

  return (
    <>
      {bmi &&
        <>
       
  <div className={styles.bmiInfo}>
    <div className={styles.bmiItem}>
      <div className={styles.icon}>🔢</div>
      <div className={styles.text}>
        <span className={styles.label}>BMI:</span> {bmi.toFixed(2)}
      </div>
    </div>
    <div className={styles.bmiItem}>
      <div className={styles.icon}>📏</div>
      <div className={styles.text}>
        <span className={styles.label}>Healthy BMI Range:</span> 18.5 to 24.9
      </div>
    </div>
    <div className={styles.bmiItem}>
      <div className={styles.icon}>🧍</div>
      <div className={styles.text}>
        <span className={styles.label}>You are:</span> {healthyBMIRange}
      </div>
    </div>
    <div className={styles.bmiItem}>
      <div className={styles.icon}>🎯</div>
      <div className={styles.text}>
        <span className={styles.label}>Your goal is to:</span> {goal}
      </div>
    </div>
  </div>
</>

      

      }



    </>
  );
}


export default BmiCalculator