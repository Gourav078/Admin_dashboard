import React, { useEffect } from 'react';
import * as d3 from 'd3'; 

const DonatGraph = ({ data }) => {
    useEffect(() => {
        // Remove duplicates based on the 'sector' field
        const uniqueData = Array.from(new Map(data.map(item => [item.sector, item]))).map(([key, value]) => value);

        const height = 640;
        const width = 640;
        const radius = Math.max(width, height) / 2;

        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1);

        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d.intensity);

        const color = d3.scaleOrdinal()
            .domain(uniqueData.map(d => d.sector))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), uniqueData.length).reverse());

        const svg = d3.select("#donut")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.selectAll('*').remove();

        svg.append("g")
            .selectAll()
            .data(pie(uniqueData))
            .join("path")
            .attr("fill", d => color(d.data.sector))
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.sector}: ${d.data.intensity}`);

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll()
            .data(pie(uniqueData))
            .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data.sector))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.intensity));

        // Filter data for legend
        const legendData = Array.from(new Set(uniqueData.map(d => d.sector))).map(sector => {
            return { sector: sector };
        });

        // Create legend
        const legend = d3.select("#legend")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("height", legendData.length * 24); // Adjust height based on the number of legend items

        const legendItems = legend.selectAll(".legend-item")
            .data(legendData)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(0, ${i * 20})`);

        legendItems.append("rect")
            .attr("x", 0)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", d => color(d.sector));

        legendItems.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .text(d => d.sector);
    }, [data]);

    return (
        <div>
            <svg className='w-[25rem] p-4 bg-cardOverlay backdrop-blur-md drop-shadow-lg rounded-xl' id='donut'>DonatGraph</svg>
            <svg className="p-4" id="legend"></svg>
        </div>
    );
};

export default DonatGraph;
