const createModal = (meal, idVideo) => {
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
};

const openModal = () => {
  document.querySelector(".modal-container").classList.add("show-modal");
  document.querySelector("body").classList.add("overflow-hidden");
};

const closeModal = () => {
  document.querySelector(".modal-container").classList.remove("show-modal");
  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector(".modal-container").innerHTML = "";
};

export { createModal, openModal, closeModal };
