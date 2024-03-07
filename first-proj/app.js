// // Selectors
// const el = d3.select("body")
//     .append("p")
//     .classed("reg", true)
//     .text("This is a paragraph.");

// // Joining data
// const data = [10, 20, 30, 40, 50];
// const el = d3.select("ul")
//     .selectAll("li")
//     .data(data)
//     .join(
//         enter => {
//             return enter.append("li")
//             .style("color", "#ff6600")
//         },
//         update => update.style("color", "purple"),
//         exit => exit.remove()
//     )
//     .text((d) => d)
// // Update method (deprecated)
// el.enter()
//     .append("")
//     .text(d => d)
// el.exit().remove();

// Loading JSON
// d3.json('data.json')
//     .then((data) => {
//         console.log(data);
//     })

// Using async await - JSON
const loadJSONData = async () => {
    const data = await d3.json('data.json');
    console.log(data);
}

const loadCSVData = async () => {
    const data = await d3.csv("data.csv")
    console.log(data);
}
loadCSVData();