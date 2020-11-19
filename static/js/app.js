// Function to build Metadata
function buildMetadata(sample) {
    d3.json("../data/samples.json").then((data) => {
        var metadata = data.metadata;

        //filter data
        var sampleObject = metadata.filter(sampleObject => sampleObject.id == sample);
        var sampleResult = sampleObject[0];
        console.log(sampleObject);

        var Panel = d3.select("#sample-metadata");

        //Clear out the Panel
        Panel.html("");

        //Use Object entries to get each key value pair
        Object.entries(sampleResult).forEach(([key, value]) => {
            Panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
            console.log(key, value);

        });
    });
}



//Function to build charts

//Function to build barchart


//Bubble chart
// Plotly.newPlot("bubble", bubbleData, bubbleLayout)
//Bonus Freq Gauge



//Event listner



//Function for initialization



//Call init function
function init() {
    //Get a ref to dropdown selector in the Test ID 
    var selector = d3.select("#selDataset");

    //Create a dropdown menu with all samples
    d3.json("../data/samples.json").then((data) => {
        var sampleNames = data.names;
        console.log(sampleNames)
        //Use forEach to append text to each sample
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);

        });

        var firstSample = sampleNames[0];
        buildMetadata(firstSample);
    });
}
init();