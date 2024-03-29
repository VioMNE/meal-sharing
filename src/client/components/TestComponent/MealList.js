import React, { useState, useEffect } from "react";

async function fetchMeals() {
  const res = await fetch("/api/meals");
  const data = await res.json();
  return data;
}

function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals().then((data) => setMeals(data));
  }, []);

  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>{meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MealList;
