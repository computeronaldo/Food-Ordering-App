import MealItem from "./MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";

const AvailableMeals = (props) => {
  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {props.meals.map((meal) => {
            return (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
