
import styles from "../styles/home.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import PercentageChart from "../Components/PercentageChart";

import { AllExpenses} from "../utils/data";
import Header from "../Components/Header";
import LineChart from "../Components/LineChart";
import Footer from "../Components/Footer";

export default function Home() {
  
  const [expensesSum, setExpensesSum] = useState(0);
  const [expensesMonth, setExpensesMonth] = useState(0);
  const [TotalYearExpenses, setTotalYearExpenses] = useState(0);
  const [selectedOption, setSelectedOption] = useState('totalExpenses');
  const [categoryData, setCategoryData] = useState({});
  const [categoryPercentages, setcategoryPercentages] = useState([]);
  const [yearsData, setYearsData] = useState({});



  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };


  const fetchAndUpdateExpensesData = (jwtToken, decodedToken) => {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    axios
      .get(`http://localhost:3333/expenses/sum/${decodedToken.id}`, {
        headers: headers,
      })
      .then((response) => {
        setExpensesSum(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses sum:', error);
      });
    axios
      .get(`http://localhost:3333/expenses/current-month/${decodedToken.id}`, {
        headers: headers,
      })
      .then((response) => {
        setExpensesMonth(response.data);
      })
      .catch((error) => {
        console.error('Error fetching current month expenses:', error);
      });
    axios
      .get(`http://localhost:3333/expenses/year/${decodedToken.id}`, {
        headers: headers,
      })
      .then((response) => {
        const expensesYearData = response.data;
        setYearsData(expensesYearData)
       
        const totalYearExpenses = Object.values(expensesYearData).reduce(
          (total, monthExpense) => total + monthExpense,
          0
        );
        
        setTotalYearExpenses(totalYearExpenses);
      })
      .catch((error) => {
        console.error('Error fetching yearly expenses:', error);
      });
  };





  useEffect(() => {
    const jwtToken = localStorage.getItem('OursiteJWT');
    const decodedToken = jwt.decode(jwtToken);

      
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      fetchAndUpdateExpensesData(jwtToken, decodedToken);


      const totals = [];
      for (const category of AllExpenses) {
        axios.get(`http://localhost:3333/expenses/categories/${category}/users/${decodedToken.id}`, {
          headers: headers,
        })
          .then((response) => {
            if (response.data.totalAmount && response.data.totalAmount.length > 0) {
              const total = response.data.totalAmount[0].total;
              categoryData[category] = total;
              totals.push(total);
            

              const totalSum = totals.reduce((sum, value) => sum + value, 0);
              setcategoryPercentages(AllExpenses.map(category => ((categoryData[category] / totalSum) * 100).toFixed(1)));

            } else {
              categoryData[category] = 0;
              totals.push(0);
             
            }

          }

          )
          .catch((error) => {
            console.error(`Error fetching expenses for ${category}:`, error);
          });
      }
    

  }, []);
  

  return (


    <div className={styles.container}>

      <Header selectedOption={selectedOption}
        handleSelectChange={handleSelectChange}
        expensesSum={expensesSum}
        expensesMonth={expensesMonth}
        TotalYearExpenses={TotalYearExpenses} />

      <main className={styles.main}>

        <PercentageChart categoryPercentages={categoryPercentages} categoryData={categoryData} totalExpenses={expensesSum} />
        <LineChart monthlyExpensesData={yearsData} />
      </main>




      <Footer />
    </div>
  );
}
