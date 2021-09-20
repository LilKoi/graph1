

const svg = d3.select("body").append("svg")
    .attr('width', 500)
    .attr('hieght', 500)
    .append('g').attr("transform", `translate(10, 10)`)

const data = [
    {id: 1, title: "hellow", value: 22},
    {id: 2, title: "hellow1", value: 2},
    {id: 3, title: "hellow2", value: 122},
    {id: 4, title: "hellow3", value: 322},
]

function draw() {
    data.map((item,n) => {
        svg.append("rect")
        .attr("class", 'bar')
        .attr("width", item.value)
        .attr("y", n * 100)
        .attr("height", 100)
    })
}
draw()