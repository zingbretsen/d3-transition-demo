// Creates a scale to map numbers from 0-1 to the color scale of white to red
var reds = d3.scaleLinear(d3.schemeReds[9]).domain([0, 1/9]);

// Scales x and y coords
let horiz = d3.scaleLinear().domain([0, 1]).range([0, 21]);
let vert = d3.scaleLinear().domain([0, 1]).range([0, 100]);

// Scales height of rect
let height = d3.scaleLinear().domain([0, 1]).range([0, 20]);

// Write out svg to hold rects
let svg = d3.select('body').append('svg');

// Write out svg to hold rects
let legend = d3.select('body').append('div').classed('legend', true);

// Default data to start with
var data = [
    {key: 'a', score: 1},
    {key: 'b', score: 0.8},
    {key: 'c', score: 0},
    {key: 'd', score: 0.2},
    {key: 'e', score: 0},
];

// Write out paragraphs to display the key and score
legend.selectAll('p')
    .data(data)
    .enter()
    .append('p')
    .text((d) => d.key + ': ' + d.score)
    .style('background-color', (d) => reds(d.score));


// Write out rects, but keep in same position and gray
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', 'gray');

// Space out the rects along x and color them
svg.selectAll('rect')
    .transition()
    .duration(1000)
    .attr('width', '20px')
    .attr('height', '20px')
    .attr('x', (d, i) => horiz(i))
    .transition()
    .duration(500)
    .attr('fill', d => reds(d.score));

function x () {
    // generate random data
    data = [
        {key: 'a', score: Math.random()},
        {key: 'b', score: Math.random()},
        {key: 'c', score: Math.random()},
        {key: 'd', score: Math.random()},
        {key: 'e', score: Math.random()},
    ];

    // sort the data so we can demonstrate sorting by score vs position
    data = data.sort((a, b) => a.score - b.score);

    // Write out the paragraphs by key and color appropriately
    legend.selectAll('p')
        .data(data, d => d.key)
        .transition()
        .duration(500)
        .text((d) => d.key + ': ' + d.score.toFixed(2))
        .style('background-color', (d) => reds(d.score));

    // Write data in sorted order, not by key
    // and set color, y pos, and height (just as examples)
    svg.selectAll('rect').data(data)
        .transition()
        .duration(500)
        .attr('fill', d => reds(d.score))
        .attr('y', d => vert(d.score))
        .attr('height', d => height(d.score) + 'px')
    ;
}

// Starting after 1s
setTimeout(() => {
    // Do transition every 1.5s
    setInterval(x, 1500);
}, 1000);
