import getMeals from "./getMeals.js";

const renderMeals = async () => {
  const meals = await getMeals();
  const numberOfmeals = document.querySelector(".meals-number");
  const container = document.querySelector(".card-container");
  let item = "";

  meals.forEach((meal) => {
    item += `
      <li class="card" id="${meal.idMeal}">
        <img class="card__img" src="${meal.strMealThumb}" alt="food-img">
        <h3> ${meal.strMeal} </h3>
        <h4>Likes (<span>0</span>) <span>❤</span></h4>
        <button type="button" class="btn btn-details">Details</button>
      </li>
    `;
  });

  numberOfmeals.insertAdjacentText("afterbegin", `(${meals.length})`);
  container.insertAdjacentHTML("beforeend", item);
};

export default renderMeals;
