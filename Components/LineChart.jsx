import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from '../styles/home.module.css';
import { monthNames } from '../utils/data';
// million-ignore

const LineChart = ({ monthlyExpensesData }) => {
    
      const labels = Object.keys(monthlyExpensesData).map(monthNumber => {
        const monthName = monthNames[parseInt(monthNumber, 10) - 1];
        return monthName;
      });
    const dataValues = Object.values(monthlyExpensesData);
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Monthly Expenses',
          data: dataValues,
          borderColor:  ' rgb(210, 0, 0)',
          backgroundColor: 'rgb(240, 0, 0)',
        
          borderWidth: 2,
          fill: false,
          
        },
        {
            label: 'Monthly Incomes',
            borderColor:  ' rgb(87, 176, 87)',
            backgroundColor: 'rgb(87, 176, 87)',
            borderWidth: 2,
            fill: false,
            
          },
      ],
    };
    
      const options = {
       
  
        scales: {
            y: {
              beginAtZero: true, 
              ticks: {
                beginAtZero: true, 
                stepSize: 500, 
                max: 10000000, 
                min: 0,
                
              },
              font: {
                size: 12,
              },
              
             
             
            },
            x:{
                font: {
                    size: 10,
                    
                  },
            }
          },
       
      
        
        
        
      };
  return (
    
    

     <div className={styles.line}>
      <p className={styles.title}>Expenses and Incomes trends:</p>
      
      <Line data={data} options={options} />
     
      </div>
  );
};

export default LineChart;
