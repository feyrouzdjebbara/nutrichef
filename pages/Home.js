
import styles from "../styles/home.module.css";
import { useRouter } from 'next/router';
import { useEffect ,useState} from "react"; 
import jwt from 'jsonwebtoken'; 
import axios from 'axios';
import PercentageChart from "../Components/PercentageChart";
import Footer from "../Components/Footer";
import { AllExpenses, categoryColors } from "../utils/data";
import Header from "../Components/Header";

export default function Home() {
    const router = useRouter();
    const [expenses, setExpenses] = useState([]);
   const [expensesSum, setExpensesSum] = useState(0); 
   const [expensesMonth, setExpensesMonth] = useState(0); 
   const [expensesYear, setExpensesYear] = useState(0); 
   const [TotalYearExpenses, setTotalYearExpenses] = useState(0);
   const [selectedOption, setSelectedOption] = useState('totalExpenses');
   const [categoryData, setCategoryData] = useState({});
   const [categoryPercentages, setcategoryPercentages] = useState([]);


  

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
                  console.log(`Total for ${category}:`, totals);
   
                  const totalSum = totals.reduce((sum, value) => sum + value, 0);
                  setcategoryPercentages(AllExpenses.map(category => ((categoryData[category] / totalSum) * 100).toFixed(1)));
               
                } else {
                  categoryData[category] = 0;
                  totals.push(0);
                  console.log(`Total for ${category} is 0`);
                }
          
             
                
                 
                  
                
              
                 







                }

              )
            .catch((error) => {
              console.error(`Error fetching expenses for ${category}:`, error);
            });
          }
    }
   
  }, [router]);

  
  return (


    <div className={styles.container}>
  
     <Header selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
          expensesSum={expensesSum}
          expensesMonth={expensesMonth}
          TotalYearExpenses={TotalYearExpenses}/>

      <main className={styles.main}>
   
     
      
      <PercentageChart categoryPercentages={categoryPercentages} categoryData={categoryData} />
      
      </main>




    <Footer/>
    </div>
  );
}
