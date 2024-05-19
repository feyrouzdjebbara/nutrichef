import React, {  useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase/firebase';
import styles from "../styles/recipe.module.css";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UserInfo from '../Components/UserInfo';
import Link from 'next/link';
import axios from 'axios';


function recipes() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [search, setSearch] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);


  const getUserInfo = async (userId) => {

    try {
      const q = query(collection(db, 'usersInfo'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        const userDoc = querySnapshot.docs[0];
        const fetchedUserInfo = userDoc.data();
        setUserInfo(fetchedUserInfo);


      } else {
        console.log('User not found:', userId);

      }
    } catch (error) {
      console.error('Error fetching user information:', error.message);
    }

  };


  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('userId');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleProfile = async () => {
    router.push('/Profile');
  };

  const fetchMeals = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const mealPromises = response.data.meals.map(meal =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
      );
      const mealsDetails = await Promise.all(mealPromises);
      setMeals(mealsDetails.map(mealDetail => mealDetail.data.meals[0]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(ingredient);
  };

  useEffect(() => {
    if (search) {
      fetchMeals(search);
    }
  }, [search]);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleClosePopup = () => {
    setSelectedMeal(null);
  };



  return (
    <>
      <div className={styles.container}>

        <Header
          userInfo={userInfo}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
        />

        <main className={styles.main}>



       
      <h1 className={styles.title}>Meal Finder</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter main ingredient"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles.grid}>
        {meals.map((meal) => (
          <div key={meal.idMeal} className={styles.card} onClick={() => handleMealClick(meal)}>
            <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image} />
            <h3 className={styles.mealName}>{meal.strMeal}</h3>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className={styles.main}>
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClosePopup}>×</button>
            <h2>{selectedMeal.strMeal}</h2>
            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className={styles.popupImage} />
            <h3>Ingredients</h3>
            <ul className={styles.ingredients}>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map(i => {
                  const ingredient = selectedMeal[`strIngredient${i}`];
                  const measure = selectedMeal[`strMeasure${i}`];
                  return ingredient && measure ? (
                    <li key={i}>{`${ingredient} - ${measure}`}</li>
                  ) : null;
                })}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedMeal.strInstructions}</p>
          </div>
        </div>
        </div>
      )}





        </main>



        <Footer />
      </div>
    </>
  );
}

export default recipes;
