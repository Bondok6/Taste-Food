import { getMeals, mealsLength } from './getMeals.js';
import { getLike, postLike } from './handleLike.js';
import likeIcon from '../img/heart.svg';

// modal section

function createModal(meal, idVideo) {
  return `
        <button class="close-modal-btn">x</button>
          <div class="modal-header">
            <figure>
              <img src="${meal.strMealThumb}" alt="Recipe image"/>
            </figure>
            <h2 class="recipe-title">${meal.strMeal}</h2>
          </div>
          <div class="info-container">
            <h3>Video Tutorial:</h2>
            <iframe src="https://www.youtube.com/embed/${idVideo}" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="info-container">
            <h3>Ingredients:</h2>
            <p class="Ingredients">
            <span>${meal.strIngredient1}</span>
            <span>${meal.strIngredient2}</span>
            <span>${meal.strIngredient3}</span>
            <span>${meal.strIngredient4}</span>
            <span>${meal.strIngredient5}</span>
            </p>
          </div>
          <div class="info-container">
            <h3>Instructions:</h2>
            <p class="description">${meal.strInstructions}</p>
          </div>
  `;
}

const modalSection = document.querySelector('.modal-container');
const $body = document.querySelector('body');

function openModal() {
  modalSection.classList.add('show-modal');
  $body.classList.add('overflow-hidden');
}

function closeModal() {
  modalSection.classList.remove('show-modal');
  $body.classList.remove('overflow-hidden');
  modalSection.innerHTML = '';
}

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

  const openModalBtn = document.querySelectorAll('.btn-details');

  openModalBtn.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      openModal();
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals[index].idMeal}`;
      const mealData = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.meals);
      const idVideo = mealData[0].strYoutube.slice(32);
      const modalArticle = document.createElement('div');
      modalArticle.className = 'modal-card';
      modalArticle.innerHTML = createModal(mealData[0], idVideo);
      modalSection.appendChild(modalArticle);
      const closeModalBtn = document.querySelector('.close-modal-btn');
      closeModalBtn.addEventListener('click', closeModal);
    });
  });

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
