d3.json("../../Data/samples.json").then((data) => {
    console.log(data);
    dropDown(data);
})

function dropDown(data) {
    var dropdownMenu = d3.select("#selDataset");
    data.names.forEach((name) => {
        dropdownMenu.append("option").text(name).attr("value", name);
    });
};

function optionChanged(selectID) {
    deleteCurrent();
    plotPlots(selectID);
    buildTable(selectID);
};

function plotPlots(selectID) {
    d3.json("../../Data/samples.json").then((data) => {
        var filteredData = data.samples.filter((sample) => sample.id==selectID)[0];
        
        traceBar = {
            x: filteredData.sample_values.slice(0,10).reverse(),
            y: filteredData.otu_ids.map((id) => `OTU ${id}`).slice(0,10).reverse(),
            text: filteredData.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
        Plotly.newPlot("bar", [traceBar])

        traceBubble = {
            type: "scatter",
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            mode: "markers",
            text: filteredData.otu_labels,
            marker: {
                colorscale: "Earth",
                color: filteredData.otu_ids,
                size: filteredData.sample_values.map((sample) => sample/2)
            }
        }
        Plotly.newPlot("bubble", [traceBubble])
    })
};

function buildTable(selectID) {
    var table = d3.select("#sample-metadata")

    d3.json("../../Data/samples.json").then((data) => {
        var filteredData = data.metadata.filter((meta) => meta.id==selectID)[0];
        Object.entries(filteredData).forEach(([meta_key, meta_value]) => {
            table.append("h5").text(`${meta_key}: ${meta_value}`);
        })
    })
};

function deleteCurrent() {
    d3.select("#sample-metadata").selectAll("h5").remove();
}


plotPlots(940);
buildTable(940);