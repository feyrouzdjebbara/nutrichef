import Link from "next/link";
import styles from "../../styles/expenses.module.css";
import { useRouter } from 'next/router';
import { useEffect ,useState} from "react"; 
import jwt from 'jsonwebtoken'; 
import axios from 'axios';
import UpdateExpensePopup from "../../Components/UpdateExpensePopup";

export default function Home() {
  const router = useRouter();
   const [expenses, setExpenses] = useState([]);
   const [expensesSum, setExpensesSum] = useState(0); 
   const [expensesMonth, setExpensesMonth] = useState(0); 
   const [expensesYear, setExpensesYear] = useState(0); 
   const [TotalYearExpenses, setTotalYearExpenses] = useState(0);
   const [selectedExpense, setSelectedExpense] = useState(null);
   const [selectedOption, setSelectedOption] = useState('totalExpenses');
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [SelectedExpenseUpdate, setSelectedExpenseUpdate] =useState(null);

  const handleUpdateClick = (expense) => {
    setSelectedExpenseUpdate(expense);
    setIsPopupOpen(true); 
  };

  const handleClosePopup = () => {
    setSelectedExpense(null);
    setIsPopupOpen(false); 
  };

   const handleExpenseClick = (expenseId) => {
    setSelectedExpense(expenseId);
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };



  const handleUpdateExpense = async (updatedExpenseData) => {
   
    const jwtToken = localStorage.getItem('OursiteJWT');
    if (!jwtToken) {
      console.error('JWT token is missing or invalid');
      return;
    }
   const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3333/expenses/${SelectedExpenseUpdate._id}`,
        updatedExpenseData,
        { headers }
      );
  
      if (response.status === 200) {
        console.log('Expense updated successfully:', response.data);
        
        const updatedExpenses = expenses.map((expense) =>
          expense._id === selectedExpense ? response.data : expense
        );

        setExpenses(updatedExpenses);
        setIsPopupOpen(false);
        setSelectedExpense(null);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      if (error.response) {
        console.error('Response data:', error.response.data); // Log the response data if available
      }
    }
  };


  const handleDeleteClick = (expenseId) => {
   
    const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
  
    if (!isConfirmed) {
      return; 
    }
  
    const deleteEndpoint = `http://localhost:3333/expenses/${expenseId}`;
    const jwtToken = localStorage.getItem('OursiteJWT');
    const decodedToken = jwt.decode(jwtToken);
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
  
    axios
      .delete(deleteEndpoint, { headers })
      .then((response) => {
        console.log('Expense deleted successfully:', response.data);
  
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
  
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== expenseId)
        );
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
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

        axios
        .get(`http://localhost:3333/expenses/sum/${decodedToken.id}`, {
          headers: headers,})
          .then((response) => {
            setExpensesSum(response.data);
           
          })
          .catch((error) => {
            console.error('Error fetching expenses sum:', error);
          });

          axios
        .get(`http://localhost:3333/expenses/current-month/${decodedToken.id}`, {
          headers: headers,})
          .then((response) => {
            setExpensesMonth(response.data);
           
          })
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
    }
  }, [router]);



  return (


    <div className={styles.container}>
      <header className={styles.header}>
    
        <div className={styles.count}>
          <div className={styles.periodcount}> 
          <select
          className={styles.periodselect}
          value={selectedOption}
          onChange={handleSelectChange}
        >
            <option value="totalExpenses">Total Expenses</option>
              <option value="thisMonth">This Month</option>
              <option value="thisYear">This Year</option>
          </select>
          </div>
          <div className={styles.containerexin}>
        {selectedOption === 'totalExpenses' ? (
          <p>Total Expenses: {expensesSum} DZD</p>
        ) : selectedOption === 'thisMonth' ? (
          <p>This Month Expenses: {expensesMonth} DZD</p>
        ) : selectedOption === 'thisYear' ? (
          <p>This Year Expenses: {TotalYearExpenses} DZD</p>
        ) : null}
      </div>
        </div>
        
      </header>

      <main className={styles.main}>
      
    
      <Link href="/Expenses/add-expense">
        <button className={styles.addExpensesButton}>+</button>
      </Link>
<div className={styles.expenses} >

    
      {isPopupOpen && (
       
        <div className={styles.popup} >
              
              <UpdateExpensePopup
              expense={SelectedExpenseUpdate}
              onUpdate={handleUpdateExpense}
              onClose={handleClosePopup}
           />
              </div>
         )}
      

      <ul className={styles.expenselist}>
          {expenses.map((expense) => (
          
            <li key={expense._id} className={styles.expenseItem} onClick={() => handleExpenseClick(expense._id)}>
              <div className={styles.expenseTop}>
                <p className={styles.expenseTitle}>Title: {expense.title}</p>
                <p className={styles.expenseDate}>
               {new Date(expense.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                
              </div>
              <p>{expense.description}</p>
              <div className={styles.expenseBottom}>
                <div className={styles.expenseLeft}>
                <p className={styles.expenseAmount}>Amount: {expense.amount}</p>
                </div>
                <div className={styles.expenseRight}>
                <p className={styles.expenseCategory}>Category: {expense.category}</p>
                
                </div>
              </div>
              {selectedExpense === expense._id && (
                <div>
                  <button  className={styles.update} onClick={() => handleUpdateClick(expense)}>Update</button>
                  <button className={styles.delete} onClick={() => handleDeleteClick(expense._id)}>Delete</button>
                </div>
                
              )}
            </li>
          ))}
        </ul>
     
</div>

      </main>

      <footer className={styles.footer}>
          <Link href="/">
          <button>Expenses</button>
        </Link>
        <Link href="/income">
          <button>Income</button>
        </Link>
        <Link href="/chart">
          <button>Chart</button>
        </Link> 
        <Link href="/about">
          <button>About</button>
        </Link> 
     
      </footer>
    </div>
  );
}
