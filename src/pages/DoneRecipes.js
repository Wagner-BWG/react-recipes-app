import React from 'react';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

const doneRecipesObj = JSON.parse(localStorage.getItem('doneRecipes'));
// [{
//   id: '52977',
//   type: 'food',
//   nationality: 'Turkish',
//   category: 'Side',
//   alcoholicOrNot: '',
//   name: 'Corba',
//   image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   doneDate: Date('June 28, 2022 20:51:00'),
//   tags: ['Soup', 'Teste'],
// }];

export default function DoneRecipes() {
  // console.log(doneRecipesObj[0].doneDate);

  let recipes = <p>{'You haven\'t done any recipes yet'}</p>;

  if (doneRecipesObj) {
    recipes = doneRecipesObj.map((recipe, index) => (
      <div key={ recipe.id }>
        <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        <img
          src={ recipe.image }
          alt="imagem"
          className="recipe-photo"
          data-testid={ `${index}-horizontal-image` }
        />
        <p>
          <span>Category: </span>
          <span data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</span>
        </p>
        <p>
          <span>Done in: </span>
          <span data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</span>
        </p>
        <p>
          <span>Tags: </span>
          { recipe.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {`${tag}, `}
            </span>
          ))}
        </p>
        <ShareBtn dataTestId={ `${index}-horizontal-share-btn` } />
      </div>
    ));
  }

  return (
    <div className="done-recipes">
      <Header page="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      {recipes}
    </div>
  );
}
