import fetch from 'cross-fetch';

const getCategories = async () => {
  const res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php',
  );
  const data = await res.json();
  const { categories } = data;
  return categories;
};

const getMeals = async (category) => {
  const resolve = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );

  const data = await resolve.json();
  const { meals } = data;
  return meals;
};

const mealsLength = async (category) => {
  const mealsArr = await getMeals(category);
  return mealsArr.length;
};

export { getMeals, mealsLength, getCategories };
