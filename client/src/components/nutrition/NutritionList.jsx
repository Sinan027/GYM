import MealCard from "./MealCard";

export default function NutritionList({ meals }) {
  return (
    <div className="grid">
      {meals.map((meal, i) => (
        <MealCard key={i} meal={meal} />
      ))}
    </div>
  );
}