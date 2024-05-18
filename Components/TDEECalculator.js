import React, { useEffect, useState } from 'react';
import styles from "../styles/bmi.module.css";
function TDEECalculator({ weight, height, age, gender, activityLevel }) {
    const [tdee, setTDEE] = useState(0);

    useEffect(() => {
        let calculatedTDEE;
        if (gender === 'man') {
            calculatedTDEE = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            calculatedTDEE = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

    
    // Adjust TDEE based on activity level
    switch (activityLevel) {
        case 'sedentary':
            calculatedTDEE *= 1.2;
            break;
        case 'lightly_active':
            calculatedTDEE *= 1.375;
            break;
        case 'moderately_active':
            calculatedTDEE *= 1.55;
            break;
        case 'very_active':
            calculatedTDEE *= 1.725;
            break;
        case 'extra_active':
            calculatedTDEE *= 1.9;
            break;
        default:
            break;
    }
            setTDEE(calculatedTDEE);
        }, [weight, height, age, gender, activityLevel]);
    
        return (
            <div className={styles.caloriesCard}>
      <div className={styles.icon}>🔥</div>
      <div className={styles.content}>
        <h3 className={styles.title}>Daily Calorie Needs</h3>
        <p className={styles.calories}>
          You need <span className={styles.caloriesValue}>{tdee.toFixed(2)}</span> calories per day
        </p>
      </div>
    </div>
     );
    }
    

export default TDEECalculator