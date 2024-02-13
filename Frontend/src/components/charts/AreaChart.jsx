import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ data }) => {
  const svgRef = useRef();
  const legendRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear existing content

    // Extract relevant data for the chart
    const chartData = data.map((item) => ({
      region: item.region,
      sector: item.sector,
      intensity: item.intensity,
    }));

    // Set up dimensions and scales
    const margin = { top: 30, right: 30, bottom: 60, left: 140 };
    const width = 700 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.region))
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const yScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.sector))
      .range([height + margin.top, margin.top])
      .padding(0.1);

    // Change color scale
    const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(chartData, (d) => d.intensity)]);

    // Draw rectangles
    svg
      .selectAll('rect')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.region))
      .attr('y', (d) => yScale(d.sector))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', (d) => colorScale(d.intensity));

    // Draw x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height + margin.top})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Draw y-axis
    svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

    // Draw legend
    const legend = d3.select(legendRef.current);
    legend.selectAll('*').remove(); // Clear existing content

    const legendScale = d3.scaleLinear().domain([0, d3.max(chartData, (d) => d.intensity)]).range([20, 200]);

    const legendAxis = d3.axisBottom(legendScale);

    legend.append('g').attr('transform', `translate(0,20)`).call(legendAxis);

    legend
      .selectAll('.legendRect')
      .data([0, 1, 2, 3, 4]) // Adjust the data range according to your intensity values
      .enter()
      .append('rect')
      .attr('class', 'legendRect')
      .attr('x', (d, i) => i * 50)
      .attr('y', 30)
      .attr('width', 40)
      .attr('height', 20)
      .style('fill', (d) => colorScale(d * 25)); // Adjust the color scale accordingly

    legend
      .selectAll('.legendLabel')
      
      .enter()
      .append('text')
      .attr('class', 'legendLabel')
      .attr('x', (d, i) => i * 50 + 20)
      .attr('y', 70)
      .text((d) => d * 25);

    legend.attr('transform', `translate(${width / 2 - 100}, ${height + margin.top - 300})`);

  }, [data]);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg
        className='h-[25rem] w-[45rem] pl-6 bg-cardOverlay backdrop-blur-md drop-shadow-lg rounded-xl'
        ref={svgRef}
      ></svg>
      <svg ref={legendRef} />
    </div>
  );
};

export default AreaChart;
