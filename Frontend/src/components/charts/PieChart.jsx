import React, { useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
    // Filter out repeated values
    const filteredData = data.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.source === value.source && t.relevance === value.relevance
        ))
    );

    useEffect(() => {
        if (filteredData.length > 0) {
            const width = 540;
            const height = 540;
            const legendWidth = 100;

            const color = d3.scaleOrdinal()
                .domain(filteredData.map(d => d.source))
                .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), filteredData.length).reverse());

            const pie = d3.pie()
                .sort(null)
                .value(d => d.relevance);

            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2 - 1);

            const labelRadius = arc.outerRadius()() * 0.8;

            const arcLabel = d3.arc()
                .innerRadius(labelRadius)
                .outerRadius(labelRadius);

            const arcs = pie(filteredData);

            const svg = d3.select('#pie')
                .attr("width", width + legendWidth)
                .attr("height", height)
                .attr("viewBox", [-width / 2, -height / 2, width + legendWidth, height])
                .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

            svg.append("g")
                .attr("stroke", "white")
                .selectAll()
                .data(arcs)
                .join("path")
                .attr("fill", d => color(d.data.source))
                .attr("d", arc)
                .append("title")
                .text(d => `${d.data.source}: ${d.data.relevance}`);

            svg.append("g")
                .attr("text-anchor", "middle")
                .selectAll()
                .data(arcs)
                .join("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "-0.7em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.source))
                .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data.relevance));

            // Create legend data
            const legendData = filteredData.map(d => ({ sector: d.source }));

            // Create legend
            const legend = d3.select("#legend-pie")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .attr("transform", `translate(0, ${height - 550})`);
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
        }
    }, [filteredData]);

    return (
        <div>
            <svg className='w-[25rem] p-4 bg-cardOverlay backdrop-blur-md drop-shadow-lg rounded-xl' id='pie' />
            <svg id="legend-pie"></svg>
        </div>
    )
}

export default PieChart;
