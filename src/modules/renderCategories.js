import { categoriesLength, getCategories } from "./getMeals.js";
import renderMeals from "./renderMeals.js";

const renderCategories = async () => {
  const categories = await getCategories();
  const categoriesNumber = await categoriesLength();

  const categoriesContainer = document.querySelector("#categories");
  const categoriesNum = document.querySelector(".categories-number");

  const categoriesSection = document.querySelector(".categories-section");
  const mealsSection = document.querySelector(".meals-section");

  let itemHtml = "";

  categories.forEach((category) => {
    itemHtml += `
      <li class="card" id="${category.idCategory}">
        <img class="card__img" src="${category.strCategoryThumb}" alt="food-img">
        <h3>${category.strCategory}</h3>
        <button type="button" class="btn btn-category">Choose</button>
      </li>
    `;
  });

  categoriesNum.insertAdjacentText("afterbegin", categoriesNumber);
  categoriesContainer.insertAdjacentHTML("beforeend", itemHtml);

  document.querySelectorAll(".btn-category").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const category =
        e.target.previousSibling.previousSibling.firstChild.textContent;

      categoriesSection.classList.add("hidden");
      mealsSection.classList.remove("hidden");

      await renderMeals(category);
    });
  });
};

export default renderCategories;
