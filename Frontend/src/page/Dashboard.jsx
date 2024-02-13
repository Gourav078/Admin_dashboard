import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "../components/charts/BarChart";
import CurvedChart from "../components/charts/CurvedChart";
import DonatGraph from "../components/charts/DonatGraph";
import AreaChart from "../components/charts/AreaChart";
import PieChart from "../components/charts/PieChart";
import Histogram from "../components/charts/Histogram";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 flex flex-wrap p-6 gap-6">
      {/* Bar Chart */}
      <div className="w-[68%] h-[50rem]  ">
        <div className="bg-lime-100 p-6 rounded-lg shadow-md h-full">
          <BarChart
            data={data
              .slice(1, 100)
              .filter((d) => d.country !== "" && d.intensity !== '')}
          />
        </div>
      </div>
      {/* Donut Graph */}
      <div className="w-[30%]">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md h-full">
          <DonatGraph
            data={data
              .slice(1, 400)
              .filter((d) => d.intensity !== "" && d.sector !== "")}
          />
        </div>
      </div>
      {/* Pie Chart */}
      <div className="w-[30%] ">
        <div className="bg-red-100 p-6 rounded-lg shadow-md h-full">
          <PieChart data={data.slice(1, 20)} />
        </div>
      </div>
      <div className="w-[68%] ">
        <div className="bg-orange-100 p-6 rounded-lg shadow-md h-full">
          <AreaChart data={data.slice(1, 100).filter((d)=> d.region !==""&& d.sector !="")} />
        </div>
      </div>
      {/* Histogram */}
      <div className="w-[49%]">
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md h-full">
          <Histogram
            data={data
              .slice(1, 200)
              .filter((d) => d.country !== "" )}
          />
        </div>
      </div>
      {/* Curved Chart */}
      <div className="w-[49%] ">
        <div className="bg-green-100 p-6 rounded-lg shadow-md h-full">
          <CurvedChart data={data.slice(1, 20)} />
        </div>
      </div>
      {/* Area Chart */}
    </div>
  );
};

export default Dashboard;
