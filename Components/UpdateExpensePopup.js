
import React, { useState ,useEffect} from 'react';
import styles from "../styles/updateExpense.module.css";
const UpdateExpensePopup = ({ expense, onUpdate, onClose }) => {

  const [expenseData, setExpenseData] = useState({
    title: expense.title,
    category: expense.category,
    amount: expense.amount,
    date: expense.date,
    description: expense.description,
  });
  useEffect(() => {
    setExpenseData((prevExpenseData) => ({
      ...prevExpenseData,
      date: new Date(expense.date).toISOString().split('T')[0],
    }));
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'date') {
      const isoDate = new Date(value);
  
      if (!isNaN(isoDate.getTime())) {
        const formattedDate = isoDate.toISOString().split('T')[0];
        setExpenseData({
          ...expenseData,
          [name]: formattedDate,
        });
      } else {
        console.error('Invalid date input');
      }
    } else {
      setExpenseData({
        ...expenseData,
        [name]: value,
      });
    }
  };
  






  const handleUpdateClick = () => {
   
    onUpdate(expenseData);
    onClose(); 
  };

  return (
    <div className="popup">
    <h3 className={styles.title}>Update Expense</h3>
      <div  className={styles.popupContent}>
        <input
          type="text"
          id="title"
          name="title"
          value={expenseData.title}
          className={styles.inputstyle}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <select
          id="category"
          name="category"
          value={expenseData.category}
          onChange={handleChange}
          placeholder="Select a category"
          className={styles.inputstyleselect}
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
        <br />
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
        <br />
        <input
          type="date"
          id="date"
          name="date"
          value={expenseData.date}
          className={styles.inputstyle}
          onChange={handleChange}
          placeholder="Date"
          required
        />
        <br />
        <textarea
          id="description"
          name="description"
          value={expenseData.description}
          onChange={handleChange}
           className={styles.inputstyle}
          placeholder="Description"
        />
        <br />
        <button className={styles.close} onClick={onClose}>Close</button>
        <button className={styles.update} onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default UpdateExpensePopup;
