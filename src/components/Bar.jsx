import React from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import Chart from "react-apexcharts";

const Bar = () => {
  const user = useSelector((state) => state.userState.user);
  const { data: recipes } = useCollection("recepts", ["uid", "==", user.uid]);

  const options = {
    chart: {
      id: "cooking-time-bar",
    },
    xaxis: {
      categories: recipes ? recipes.map((recipe) => recipe.title) : [],
    },
  };

  const series = [
    {
      name: "Cooking Time",
      data: recipes ? recipes.map((recipe) => recipe.cookingTime) : [],
    },
  ];

  return (
    <div className="app">
      <h2 className="font-bold text-xl mb-5 text-center">
        Cooking Time (in minutes)
      </h2>
      <div className="row">
        <div className="mixed-chart w-full">
          <Chart options={options} series={series} type="bar" width="480" />
        </div>
      </div>
    </div>
  );
};

export default Bar;
