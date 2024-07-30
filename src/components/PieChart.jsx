import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.userState);
  const { data: recipes } = useCollection("recepts", ["uid", "==", user.uid]);

  useEffect(() => {
    if (recipes) {
      const categoryCounts = recipes.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      setCategories(Object.keys(categoryCounts));
      setSeries(Object.values(categoryCounts));
    }
  }, [recipes]);

  const options = {
    chart: {
      width: 480,
      type: "pie",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: 480,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="mb-10">
      <h2 className="text-center text-xl font-bold mb-5">
        Food Category
      </h2>
      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={480}
        />
      </div>
    </div>
  );
};

export default PieChart;
