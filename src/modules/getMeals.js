const getMeals = async () => {
  const resolve = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
  );

  const data = await resolve.json();
  const meals = data.meals;
  return meals;
};

export default getMeals;
