import { getCategories } from "./getMeals";
import renderMeals from "./renderMeals";

const renderCategories = async () => {
  const categories = await getCategories();

  const categoriesContainer = document.querySelector("#categories");
  const categoriesSection = document.querySelector(".categories-section");
  const mealsSection = document.querySelector(".meals-section");

  console.log(categories);

  let itemHtml = "";

  categories.forEach((category) => {
    itemHtml += `
      <li class="card" id="${category.idCategory}">
        <img class="card__img" src="${category.strCategoryThumb}" alt="food-img">
        <h3>${category.strCategory}</h3>
        <button type="button" class="btn btn-category">Choose this</button>
      </li>
    `;
  });

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
