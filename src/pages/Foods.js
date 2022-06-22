import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import { API_FOODS_URL } from '../helpers/constants';
import getFoodsFromAPI from '../helpers/fetchers';
import CategoryMenu from '../components/CategoryMenu';

export default function Foods() {
  const { mealsList, setMealsList } = useContext(RecipesContext);
  const history = useHistory();

  const condition = () => {
    if (mealsList) {
      if (mealsList.length === 1) {
        history.push(`/foods/${mealsList[0].idMeal}`);
      }
      if (mealsList.length > 1) {
        return mealsList.map((meal, index) => (
          <Card key={ index } index={ index } recipe={ meal } />));
      }
      return (<p />);
    }
  };

  useEffect(() => {
    console.log('Carregou FOODS');
    const defaultList = async () => {
      const updatedList = await getFoodsFromAPI(API_FOODS_URL, 'search.php?s=', '');
      setMealsList(updatedList);
    };
    defaultList();
  }, [setMealsList]);

  return (
    <div className="foods">
      <Header page="Foods" searchbar />
      <CategoryMenu source={ API_FOODS_URL } />
      { condition() }
      <Footer />
    </div>
  );
}
