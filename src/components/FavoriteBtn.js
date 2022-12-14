import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ recipeInfo, recipeType, short, index, buttonFunction }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const type = recipeType === 'Meal' ? 'food' : 'drink';

  const thisRecipe = short ? {
    id: recipeInfo.id,
    type,
    nationality: recipeInfo.nationality,
    category: recipeInfo.category,
    alcoholicOrNot: recipeInfo.alcoholicOrNot,
    name: recipeInfo.name,
    image: recipeInfo.image,
  } : {
    id: recipeInfo[`id${recipeType}`],
    type,
    nationality: recipeInfo.strArea || '',
    category: recipeInfo.strCategory || '',
    alcoholicOrNot: recipeInfo.strAlcoholic || '',
    name: recipeInfo[`str${recipeType}`],
    image: recipeInfo[`str${recipeType}Thumb`],
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const isInTheList = favoritesList.find((recipe) => recipe.id === thisRecipe.id);
      setIsFavorite(isInTheList);
    }
  }, []);

  useEffect(() => {}, [isFavorite]);

  const handleClick = () => {
    // console.log('clicou!');
    let newFavoritesList;
    if (isFavorite) {
      newFavoritesList = favoritesList
        .filter((recipe) => recipe.id !== thisRecipe.id);
      setIsFavorite(false);
    } else {
      newFavoritesList = [...favoritesList, thisRecipe];
      setIsFavorite(true);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
  };

  return (
    <button
      type="button"
      onClick={ short ? buttonFunction : () => handleClick() }
    >
      Favoritar
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite icon - empty"
        data-testid={ short ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
      />
    </button>
  );
}

FavoriteBtn.defaultProps = {
  short: false,
  index: 0,
  buttonFunction: () => console.log('nothing'),
};

FavoriteBtn.propTypes = {
  recipeInfo: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
  short: PropTypes.bool,
  index: PropTypes.number,
  buttonFunction: PropTypes.func,
};

export default FavoriteBtn;
