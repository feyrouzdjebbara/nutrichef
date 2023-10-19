import Link from "next/link";
import styles from "../styles/home.module.css";
import { useRouter } from 'next/router';
import { useEffect ,useState} from "react"; 
import jwt from 'jsonwebtoken'; 
import axios from 'axios';
import * as d3 from 'd3';

export default function Home() {
    const router = useRouter();
    const [expenses, setExpenses] = useState([]);
   const [expensesSum, setExpensesSum] = useState(0); 
   const [expensesMonth, setExpensesMonth] = useState(0); 
   const [expensesYear, setExpensesYear] = useState(0); 
   const [TotalYearExpenses, setTotalYearExpenses] = useState(0);
   const [selectedExpense, setSelectedExpense] = useState(null);
   const [selectedOption, setSelectedOption] = useState('totalExpenses');
   const [categoryData, setCategoryData] = useState({});
   const AllExpenses = ["Food", "Bills", "Travel", "Entertainment", "Transportation", "Other"];
   const percentages = [];
   const [percentage, setpercentage] = useState([]);
let data=[];
const categoryColors = [
    'blue',  
    'orange',  
    'green',  
    'red',  
    'purple',  
    'brown',  
  ];
  


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
                  console.log(`Total for ${category}:`, total);
                } else {
                  // Si totalAmount n'existe pas ou est vide, définir la valeur sur 0
                  categoryData[category] = 0;
                  totals.push(0);
                  console.log(`Total for ${category} is 0`);
                }
          
                if (totals.length === AllExpenses.length) {
                   
                  const totalSum = totals.reduce((sum, value) => sum + value, 0);
                  const categoryPercentages = AllExpenses.map(category => ((categoryData[category] / totalSum) * 100).toFixed(1));
                  percentages.push(categoryPercentages);
                  setpercentage(percentages)
                  console.log("Percentages:", categoryPercentages);
                  if (percentages.length === AllExpenses.length) {
                    // Toutes les catégories ont été traitées, utilisez 'percentages' comme souhaité
                    console.log("Percentages:", percentages);
                  }
                 
                  setpercentage(percentages)

                
                 data = [categoryPercentages[0], 
                  categoryPercentages[1],
                  categoryPercentages[2],
                  categoryPercentages[3],
                  categoryPercentages[4],
                  categoryPercentages[5]];
                
                  setpercentage(data);
                  const width = 300;
                  const height = 300;
                  const svg = d3.select('#percentage-chart')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
              
                  const radius = Math.min(width, height) / 2;
                  const color = d3.scaleOrdinal(d3.schemeCategory10);
              
                  // Création de l'arc pour le graphique à secteurs
                  const arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);
              
                  const pie = d3.pie().value(d => d);
              
                  // Création des secteurs du graphique à secteurs
                  const arcs = svg.selectAll('g.arc')
                    .data(pie(data))
                    .enter()
                    .append('g')
                    .attr('class', 'arc')
                    .attr('transform', `translate(${width / 2},${height / 2})`);
              
                  // Ajout de couleurs aux secteurs
                  arcs.append('path')
                    .attr('d', arc)
                    .attr('fill', (d, i) => color(i));
              
                  // Ajout de labels de pourcentage
                  arcs.append('text')
                    .attr('transform', d => `translate(${arc.centroid(d)})`)
                    .attr('text-anchor', 'middle')
                    .text(d => `${d.data}%`);








                }

              })
            .catch((error) => {
              console.error(`Error fetching expenses for ${category}:`, error);
            });
          }
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
    <div className={styles.containerTotal}>
    <div  className={styles.containerexin}>
    { selectedOption === 'totalExpenses' ? (
        <p>Expenses: <br/>  {expensesSum} DZD</p>
      ) : selectedOption === 'thisMonth' ? (
        <p>Expenses: <br/> {expensesMonth} DZD</p>
      ) : selectedOption === 'thisYear' ? (
        <p>Expenses: <br/> {TotalYearExpenses} DZD</p>
      ) : null } 
     
      </div>
    </div>

    <div className={styles.containerTotal} >
    <div className={styles.containerIncome}>
      { selectedOption === 'totalExpenses' ? (
        <p>Incomes: <br/>  {expensesSum} DZD</p>
      ) : selectedOption === 'thisMonth' ? (
        <p>Incomes: <br/> {expensesMonth} DZD</p>
      ) : selectedOption === 'thisYear' ? (
        <p>Incomes: <br/> {TotalYearExpenses} DZD</p>
      ) : null }
      
    </div>
    </div>
    </div>





      </header>

      <main className={styles.main}>
   
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
      {percentage[index]}%
    </div>
  </div>
))}


      </div>
      </main>




      <footer className={styles.footer}>
      <Link href="/Home">
          <button>Home</button>
        </Link>
          <Link href="/Expenses/my-expenses">
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
