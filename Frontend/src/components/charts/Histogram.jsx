import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Histogram = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        // Format date to match 'January, 20 2017 03:51:25'
        const parseDate = d3.timeParse('%B, %d %Y %H:%M:%S');
        data.forEach(d => {
            d.added = parseDate(d.added);
        });

        const margin = { top: 40, right: 80, bottom: 190, left: 40 };
        const width = 700 - margin.left - margin.right; // Adjusted width
        const height = 490 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d3.timeFormat('%d-%b-%Y')(d.added)))
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, d => d.intensity)]);

        // Draw bars
        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d3.timeFormat('%d-%b-%Y')(d.added)))
            .attr('width', xScale.bandwidth())
            .attr('y', d => yScale(d.intensity))
            .attr('height', d => height - yScale(d.intensity))
            .attr('fill', 'red');

        // Draw x-axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        // Draw y-axis
        svg.append('g')
            .call(d3.axisLeft(yScale));

        // Legends
        const legends = svg.append('g')
            .attr('transform', `translate(${width / 2},${height + margin.top + 40})`); // Positioned at bottom center

        legends.append('text')
            .text('Intensity')
            .attr('x', 50)
            .attr('y', 10)
            .attr('font-size', '12px')
            .attr('fill', 'black');

        legends.append('rect')
            .attr('x', 20)
            .attr('y', -5)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', 'red');

    }, [data]);

    return (
        <svg className='h-[25rem] w-[69rem] font-extralight bg-cardOverlay backdrop-blur-md drop-shadow-lg rounded-xl' ref={svgRef}></svg>
    );
};

export default Histogram;
