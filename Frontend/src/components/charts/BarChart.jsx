import React, { useEffect } from "react";
import * as d3 from 'd3'; 

const BarChart = ({ data }) => {
  const renderChart = () => {
    // Select the chart container
    const chartContainer = d3.select("#chart-container");

    // Clear the container
    chartContainer.selectAll("*").remove();

    // Append SVG for the chart
    const svg = chartContainer
      .append("svg")
      .attr("width", 950)
      .attr("height", 700);

    const margin = { top: 10, right: 0, bottom: 120, left: 20 }; // Increased bottom margin for legend
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.country));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, (d) => d.intensity)]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-65)");

    g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(10).tickSize(-width));

    // Define color scales for likelihood and relevance
    const colorScaleLikelihood = d3.scaleOrdinal()
      .domain(["Likelihood", "Relevance"])
      .range(["green", "blue"]);

    // Render bars for likelihood and relevance
    const barGroups = g.selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(${x(d.country)}, 0)`);

    barGroups.selectAll("rect")
      .data((d) => [d.likelihood, d.relevance])
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (x.bandwidth() / 2))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y(d))
      .style("fill", (d, i) => colorScaleLikelihood(i === 0 ? "Likelihood" : "Relevance"));

    // Add legend
    const legendWidth = 200; // Adjusted width of the legend
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${(width - legendWidth) / 2},${height + margin.top + 75})`); // Positioned at bottom center

    legend.selectAll("rect")
      .data(["Likelihood", "Relevance"])
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 100)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 10)
      .style("fill", (d, i) => colorScaleLikelihood(d));

    legend.selectAll("text")
      .data(["Likelihood", "Relevance"])
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 100 + 25)
      .attr("y", 9)
      .attr("dy", "0.45em")
      .text((d) => d);
  };

  useEffect(() => {
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  return <div id="chart-container"/>;
};

export default BarChart;
