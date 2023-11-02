import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import { AllExpenses, categoryColors } from '../utils/data';
import styles from '../styles/home.module.css';

export default function PercentageChart({ categoryPercentages, categoryData ,totalExpenses }) {
     const data = {
          labels: AllExpenses,
          datasets: [
            {
              data: categoryPercentages,
              backgroundColor: categoryColors,
            },
          ],
        };
      
        const options = {
          responsive: true,
          cutout: '0%',
          plugins: {
            legend: {
              display: false, 
            },
            
          
          
          
        }
        
      
      
      }


  return (
   <div className={styles.relativeCircle}>
      <p className={styles.title}>Total Expenses:</p>
      <div id="percentage-chart" className={styles.chartContainer}>
        <Pie data={data} options={options} datasetIdKey={totalExpenses}/>
       
      </div>
      {AllExpenses.map((category, index) => (
        <div className={styles.categoryRow} key={category}>
          <span className={styles.circle} style={{ backgroundColor: categoryColors[index] }}></span>
          <div className={styles.category}>
            {category} : {categoryData[category] !== undefined ? categoryData[category] : '0'}
          </div>
          <div className={styles.percentage}>{categoryPercentages[index]}%</div>
        </div>
      ))}
    </div>
  );
};





