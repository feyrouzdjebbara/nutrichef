import styles from "../../styles/addExpense.module.css";
import { useState  } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/router";

export default function AddExpense() {

    const router = useRouter();

    const [expenseData, setExpenseData] = useState({
        title: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split('.')[0],
        description: '',
      });
     
      const handleChange = (e) => {
        const { name, value } = e.target;
        
         
            setExpenseData({
              ...expenseData,
              [name]: name === 'amount' ? parseFloat(value) : value,
            });
          
        };
      

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const Expense= {
            title: expenseData.title,
            amount: expenseData.amount,
            date: expenseData.date,
            category: expenseData.category,
            description: expenseData.description,
          };

          if (typeof window !== 'undefined') {
             console.log(expenseData.date)
            const authToken = localStorage.getItem('OursiteJWT');
            const headers = {
              Authorization: `Bearer ${authToken}`,
            };

           
              
          const response = await axios.post('http://localhost:3333/expenses/add', 
          Expense ,{ headers });
    
          if (response.status === 201) {
            console.log('Expense added successfully:', response.data);
            router.push('/Expenses/my-expenses');
          } else {
            console.error('Failed to add expense:', response.status, response.data);
          }
        }
    } catch (error) {
        if (error.response) {
          console.error('Error adding expense - Response Data:', error.response.data);
          console.error('Error adding expense - Status:', error.response.status);
        } else if (error.request) {
          console.error('Error adding expense - Request:', error.request);
        } else {
          console.error('Error adding expense - Message:', error.message);
        }
      }
    };
      
     
      
      
      
      

  return (
    <>
    
    <div className={styles.home}>
    <Link  href="/Expenses/my-expenses">
    <img src="/img/back.png" alt="Home" />
    </Link>
    </div>
    
     <div className={styles.container}>
    
      <h1 className={styles.title}>Add Expense.</h1>
    
    <div> 
      <form className={styles.formstyle} onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            value={expenseData.name}
            className={styles.inputstyle}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        <br/>
          <select 
            id="category"
            name="category"
            value={expenseData.category}
            onChange={handleChange}
            className={styles.inputstyle}
            placeholder="Select a category"
            required
          >
            <option  value="" disabled >
              Select a category
            </option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
            
          </select>
          <br/>
          
          <input
            type="text"
            id="amount"
            name="amount"
            value={expenseData.amount}
            className={styles.inputstyle}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
       <br/>
       <input
            type="date"
            id="date"
            name="date"
            value={expenseData.date} 
            onChange={handleChange}
            className={styles.inputstyle}
            placeholder="Date"
            />
           <br/>
          <textarea
            id="description"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            className={styles.inputstyle}
            placeholder="Description"
          />
          <br/>
          <input
          type="submit"
          value="Add Expense"
          className={styles.subbutton}
        />
        
       
      </form>
      
    </div>
   
       
    </div>
      </>
  );
}
