import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import classes from "./Meals.module.css";
import { useEffect, useState, useCallback } from "react";

const Meals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-479d8-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const mealsData = [];
      Object.entries(data).forEach(([key, value]) => {
        const mealObj = {
          id: key,
        };
        Object.entries(value).forEach(([key, value]) => {
          mealObj[key] = value;
        });
        mealsData.push(mealObj);
        setMeals(mealsData);
      });
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <>
      <MealsSummary />
      <AvailableMeals meals={meals} />
    </>
  );
};

export default Meals;
