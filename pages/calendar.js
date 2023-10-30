import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import styles from "../styles/calendar.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

export default function calendar() {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [expensesSum, setExpensesSum] = useState(0);
  const [expensesMonth, setExpensesMonth] = useState(0);
  const [expensesYear, setExpensesYear] = useState(0);
  const [TotalYearExpenses, setTotalYearExpenses] = useState(0);
  const [selectedOption, setSelectedOption] = useState('totalExpenses');
  const [date, setDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(new Date());
  
 
  


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
        const totalYearExpenses = Object.values(expensesYearData).reduce(
          (total, monthExpense) => total + monthExpense,
          0
        );
        setExpensesYear(expensesYearData);
        setTotalYearExpenses(totalYearExpenses);
      })
      .catch((error) => {
        console.error('Error fetching yearly expenses:', error);
      });
  };





  useEffect(() => {
    const jwtToken = localStorage.getItem('OursiteJWT');
    const decodedToken = jwt.decode(jwtToken);

    if (!jwtToken) {
      router.push('/login');
    } else {
      console.log(decodedToken)
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      axios.get(`http://localhost:3333/expenses/my-expenses/${decodedToken.id}`, {
        headers: headers,
      })
        .then((response) => {
          setExpenses(response.data);

        })
        .catch((error) => {
          console.error('Error fetching expenses:', error);
        });

      fetchAndUpdateExpensesData(jwtToken, decodedToken);

    }

  }, [router]);



  const dateData = {
  '2023-10-29': { expenses: '1300', incomes: '700' },
  '2023-10-30': { expenses: '1800', incomes: '900' },
};
  




  const formattedDate = format(date, 'MMMM dd, yyyy');
  console.log(formattedDate);
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
   
  };
  const handleClickDay = (value) => {
    setClickedDate(value);
  };


  const tileClassName = ({ date, view }) => {
    if (clickedDate && date.getDate() === clickedDate.getDate()) {
      return styles.clickedDay; 
    }
    return null;
  };
  

  function getDataForDate(selectedDate) {
    const isoDate = selectedDate.toISOString().split('T')[0];
    return dateData[isoDate] || { expenses: 'Aucune donnée', incomes: 'Aucune donnée' };
  }

  const data = getDataForDate(date);


  return (

    <div className={styles.container}>

      <Header selectedOption={selectedOption}
        handleSelectChange={handleSelectChange}
        expensesSum={expensesSum}
        expensesMonth={expensesMonth}
        TotalYearExpenses={TotalYearExpenses} />

      <main className={styles.main}>

        <div className={styles.calendarContainer}>

          <p className={styles.title}>My Calendar:</p>
         
          <Calendar 
          value={date} 
          onChange={handleDateChange} 
          onClickDay={handleClickDay}
          tileClassName={styles.clickedDay} 
          />

         {clickedDate && <div><p className={styles.title}>
        
          {clickedDate.toDateString()} 
          </p>  
          <p className={styles.titleExpenses}>Total Expenses for this day: {data.expenses} DZD</p>
          <p className={styles.titleIncomes}>Total Incomes for this day: {data.incomes} DZD</p>
         </div>
        }
        </div>
      </main>




      <Footer />
    </div>
  )
}
