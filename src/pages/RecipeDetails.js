import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_COCKTAILS_URL, API_FOODS_URL } from '../helpers/constants';
import Ingredients from '../components/Ingredients';
import Recomendations from '../components/Recomendations';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objKey, setObjKey] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const requestApi = async () => {
      if (path.includes('foods')) {
        setObjKey('Meal');
        const recipe = await getFoodsFromAPI(API_FOODS_URL, 'lookup.php?i=', id);
        setRecipeInfo(recipe);
        setLoading(false);
      } else {
        setObjKey('Drink');
        const recipe = await getFoodsFromAPI(API_COCKTAILS_URL, 'lookup.php?i=', id);
        setRecipeInfo(recipe);
        setLoading(false);
      }
    };
    requestApi();
  }, []);

  useEffect(() => {
    if (recipeInfo.length > 0 && objKey === 'Meal') {
      const videoId = recipeInfo[0].strYoutube.split('=')[1];
      setVideoUrl(videoId);
    }
  }, [recipeInfo, objKey]);

  return (
    loading ? <p>Loading . . .</p> : (
      <div>
        <p />
        <img
          data-testid="recipe-photo"
          src={ recipeInfo[0][`str${objKey}Thumb`] }
          alt=""
        />
        <h2 data-testid="recipe-title">{ recipeInfo[0][`str${objKey}`] }</h2>
        <button
          data-testid="share-btn"
          type="button"
        >
          Compartilhar
        </button>

        <button
          data-testid="favorite-btn"
          type="button"
        >
          Favoritar
        </button>
        <p data-testid="recipe-category">
          { objKey === 'Drink' ? recipeInfo[0].strAlcoholic : recipeInfo[0].strCategory }
        </p>
        <Ingredients recipeInfo={ recipeInfo } />
        <p data-testid="instructions">{recipeInfo[0].strInstructions}</p>
        {objKey === 'Meal'
          && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${videoUrl}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
                autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        <div
          className="recomendation-menu"
        >
          <Recomendations objKey={ objKey } />
        </div>
        <button
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar
        </button>
      </div>
    )
  );
}
RecipeDetails.defaultProps = {
  params: {},
  id: '',
  path: '',
};
RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  params: PropTypes.shape(),
  id: PropTypes.string,
  path: PropTypes.string,
};

export default RecipeDetails;
