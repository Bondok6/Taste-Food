import fetch from "cross-fetch";

const getMeals = async () => {
  const resolve = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
  );

  const data = await resolve.json();
  const { meals } = data;
  return meals;
};

const mealsLength = async () => {
  const mealsArr = await getMeals();
  return mealsArr.length;
};

export { getMeals, mealsLength };
