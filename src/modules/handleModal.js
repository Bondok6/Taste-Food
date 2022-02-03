import {
  displayComments,
  addComment,
  commentsCounter,
} from "./handleComments.js";

let commentsLength = 0;

const modalTemplate = (meal, idVideo, commentsLength) => `
        <button class="close-modal-btn">x</button>
          <div class="modal-header">
            <figure>
              <img src="${meal.strMealThumb}" alt="Recipe image"/>
            </figure>
            <h2 class="recipe-title">${meal.strMeal}</h2>
          </div>
          <div class="info-container">
            <h3>Video Tutorial:</h2>
            <iframe
            src="https://www.youtube.com/embed/${idVideo}"
            frameborder="0"
            allowfullscreen>
            </iframe>
          </div>
          <div class="info-container">
            <h3>Ingredients:</h2>
            <p class="Ingredients">
            <span>${meal.strIngredient1}: ${meal.strMeasure1}</span>
            <span>${meal.strIngredient2}: ${meal.strMeasure2}</span>
            <span>${meal.strIngredient3}: ${meal.strMeasure3}</span>
            <span>${meal.strIngredient4}: ${meal.strMeasure4}</span>
            <span>${meal.strIngredient5}: ${meal.strMeasure5}</span>
            </p>
          </div>
          <div class="info-container">
            <h3>Instructions:</h2>
            <p class="description">${meal.strInstructions}</p>
          </div>
          <div class="info-container comments">
            <h3>Comments (<span class="counter">${commentsLength}</span>)</h2>
            <ul class="comment-container"></ul>
            <h3>Add a comment</h2>
            <div class="msgErrorContainer"></div>
            <form action="index_submit" method="POST" accept-charset="utf-8">
              <input type="text" placeholder="Name" name="Your name" maxlength="20" required/>
              <textarea
                name="text-area"
                maxlength="220"
                placeholder="Your Insights" cols="50" rows="10" required></textarea>
              <button type="submit" class="btn add-comment-btn">Comment</button>
            </form>
          </div>
  `;

const modalSection = document.querySelector(".modal-container");
const $body = document.querySelector("body");

const openModal = () => {
  modalSection.classList.add("show-modal");
  $body.classList.add("overflow-hidden");
};

const closeModal = () => {
  modalSection.classList.remove("show-modal");
  $body.classList.remove("overflow-hidden");
  modalSection.innerHTML = "";
};

const createModal = (mealData, commentsLength) => {
  const idVideo = mealData[0].strYoutube.slice(32);
  const modalArticle = document.createElement("div");
  modalArticle.className = "modal-card";
  modalArticle.innerHTML = modalTemplate(mealData[0], idVideo, commentsLength);
  modalSection.appendChild(modalArticle);
  const closeModalBtn = document.querySelector(".close-modal-btn");
  closeModalBtn.addEventListener("click", closeModal);
};

const handleModal = (meals) => {
  const openModalBtn = document.querySelectorAll(".btn-details");

  openModalBtn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      openModal();
      commentsLength = await commentsCounter(meals[index].idMeal);
      const urlBase = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
      const url = `${urlBase}${meals[index].idMeal}`;
      const mealData = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.meals);

      createModal(mealData, commentsLength);
      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        addComment(event, form, meals[index].idMeal);
      });

      displayComments(meals[index].idMeal);
    });
  });
};

export default handleModal;
