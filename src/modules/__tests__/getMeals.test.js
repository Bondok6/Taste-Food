import { getMeals, mealsLength } from "../getMeals.js";

describe("Items (meals) Counter", () => {
  test("Display the Number of Meals", async () => {
    const mealsCount = await mealsLength();
    expect(mealsCount).toBe(18);
  });

  test("Display the length of the items", async () => {
    const meals = await getMeals();
    expect(meals).toHaveLength(18);
  });
});
