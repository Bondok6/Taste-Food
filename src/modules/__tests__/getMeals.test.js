import { getMeals, mealsLength } from '../getMeals.js';

const category = 'Beef';

describe('Items (meals) Counter', () => {
  test('Display the Number of Meals', async () => {
    const mealsCount = await mealsLength(category);
    expect(mealsCount).toBe(42);
  });

  test('Display the length of the items', async () => {
    const meals = await getMeals(category);
    expect(meals).toHaveLength(42);
  });
});
