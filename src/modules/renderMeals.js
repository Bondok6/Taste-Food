import { getMeals, mealsLength } from './getMeals.js';
import { getLike, postLike } from './handleLike.js';
import likeIcon from '../img/heart.svg';

const renderMeals = async () => {
  const meals = await getMeals(); // get Meals from API
  const mealsCount = await mealsLength(); // get the number of meals
  const likesNum = await getLike(); // get Likes from API

  const numberOfmeals = document.querySelector('.meals-number');
  const container = document.querySelector('.card-container');

  let item = '';

  meals.forEach((meal, ind) => {
    item += `
      <li class="card" id="${meal.idMeal}">
        <img class="card__img" src="${meal.strMealThumb}" alt="food-img">
        <h3> ${meal.strMeal} </h3>
        <h4>Likes (<span>${likesNum[ind].likes}</span>) <img class="like-icon" src="${likeIcon}" alt="like-icon"></h4>
        <button type="button" class="btn btn-details">Details</button>
      </li>
    `;
  });

  numberOfmeals.insertAdjacentText('afterbegin', `(${mealsCount})`);
  container.insertAdjacentHTML('beforeend', item);

  const likes = document.querySelectorAll('.like-icon');
  const span = document.querySelectorAll('h4>span');

  likes.forEach((like, ind) => {
    like.addEventListener('click', (e) => {
      const { id } = e.target.parentNode.parentNode;
      const oldLikes = Number(span[ind].textContent);
      span[ind].textContent = oldLikes + 1;
      postLike(id); // send data(likes) to API
    });
  });
};

export default renderMeals;
