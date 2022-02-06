import { getMeals, mealsLength } from "../getMeals.js";

const category = "italian";

describe("Items (meals) Counter", () => {
  test("Display the Number of Meals", async () => {
    const mealsCount = await mealsLength(category);
    expect(mealsCount).toBe(18);
  });

  test("Display the length of the items", async () => {
    const meals = await getMeals(category);
    expect(meals).toHaveLength(18);
  });
});
