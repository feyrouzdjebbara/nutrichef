import React from 'react'
import { useEffect } from 'react';
import { AllExpenses, categoryColors } from '../utils/data';
import styles from "../styles/home.module.css";
export default function PercentageChart({categoryPercentages,categoryData}) {

    useEffect(() => {
        if (categoryPercentages.length === 6 && categoryPercentages.every(value => !isNaN(value))) {
          const width = 300;
          const height = 300;
          const radius = Math.min(width, height) / 2;
        
            
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', width);
          svg.setAttribute('height', height);
      
          const total = categoryPercentages.reduce((acc, value) => acc + parseFloat(value), 0);
      
          let startAngle = 0;
          for (let i = 0; i < categoryPercentages.length; i++) {
            const endAngle = startAngle + (360 * (parseFloat(categoryPercentages[i]) / total));
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const x1 = width / 2 + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
            const y1 = height / 2 + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
            const x2 = width / 2 + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
            const y2 = height / 2 + radius * Math.sin((endAngle - 90) * (Math.PI / 180));
      
            const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
            const d = `M ${width / 2} ${height / 2} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            path.setAttribute('d', d);
            path.setAttribute('fill', categoryColors[i]);
            svg.appendChild(path);
            startAngle = endAngle;
          }
      
          const container = document.querySelector('#percentage-chart');
          container.innerHTML = '';
          container.appendChild(svg);
        }
      }, [categoryPercentages]);
       


  return (
    <>
     <div className={styles.relativeCircle}>
        
        <p className={styles.title}>Total Expenses:</p>
    <div id="percentage-chart"></div>
    {AllExpenses.map((category, index) => (
        <div className={styles.categoryRow} key={category}>
          <span className={styles.circle} style={{ backgroundColor: categoryColors[index] }}></span>
          <div className={styles.category}>
            {category} : {categoryData[category] !== undefined ? categoryData[category] : "0"}
          </div>
          <div className={styles.percentage}>
            {categoryPercentages[index]}%
          </div>
        </div>
      ))}
      </div>
      </>
  )
}
