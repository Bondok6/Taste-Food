import { getMeals, mealsLength } from "./getMeals.js";
import { getLike, postLike } from "./handleLike.js";
import likeIcon from "../img/heart.svg";
import handleModal from "./handleModal.js";

const displayLikes = async () => {
  const likesNum = await getLike();

  for (let i = 0; i < likesNum.length; i += 1) {
    const id = document.querySelector(`[data-id="${likesNum[i].item_id}"]`);
    if (id) {
      const span = id.querySelector("h4>span");
      span.textContent = likesNum[i].likes;
    }
  }
};

const renderMeals = async (category) => {
  const meals = await getMeals(category); // get Meals from API
  const mealsCount = await mealsLength(category); // get the number of meals

  const numberOfMeals = document.querySelector(".meals-number");
  const mealsContainer = document.querySelector("#meals");

  let item = "";

  meals.forEach((meal) => {
    let mealName = meal.strMeal.split(" ").slice(0, 3).join(" ");

    item += `
      <li class="card" data-id="${meal.idMeal}">
        <img class="card__img" src="${meal.strMealThumb}" alt="food-img">
        <h3>${mealName}</h3>
        <h4>Likes (<span>0</span>) 
        <img class="like-icon" src="${likeIcon}" alt="like-icon"></h4>
        <button type="button" class="btn btn-details">Details</button>
      </li>
    `;
  });

  numberOfMeals.insertAdjacentText("afterbegin", `(${mealsCount})`);
  mealsContainer.insertAdjacentHTML("beforeend", item);

  handleModal(meals);

  const likes = document.querySelectorAll(".like-icon");

  likes.forEach((like, ind) => {
    like.addEventListener("click", async (e) => {
      const id = e.target.parentNode.parentNode.getAttribute("data-id");
      await postLike(id);
      await displayLikes();
    });
  });

  await displayLikes();
};

export default renderMeals;
