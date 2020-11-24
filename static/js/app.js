// Function to build Metadata
function buildMetadata(sample) {
    d3.json("./data/samples.json").then((data) => {
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
function buildCharts(sample) {
    d3.json("./data/samples.json").then((data) => {
        var samples = data.samples.filter(sampleObject => sampleObject.id == sample)[0];
        console.log(samples);
        var yticks = samples.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
        var barData = [
            {
                y: yticks,
                x: samples.sample_values.slice(0, 10),
                text: samples.otu_labels.slice(0, 10),
                type: "bar",
                orientation: "h"

            }
        ];

        var barLayout = {
            title: "Top Ten Bacteria",
            margin: { t: 30, l: 150 },
            yaxis: {
                autorange:"reversed"
            }
        };


        Plotly.newPlot("bar", barData, barLayout);  
   
      //Bubble chart
        var bubbleData = [
            {
                x: samples.otu_ids,
                y:samples.sample_values,
                text:samples.otu_labels,
                mode:"markers",
                marker:{
                    size: samples.sample_values,
                    color: samples.otu_ids,
                    colorscale:"Hot"
                }
            }
        ]; 

        var bubbleLayout = {
            title:"Bacteria per Sample",
            margin: {t:0},
            hovermode: "closest",
            xaxis: { title:"OTU ID"},
            margin: {t:30}

        };


        Plotly.newPlot("bubble", bubbleData, bubbleLayout);  
    });

}

//Bonus Freq Gauge



//Event listner
function optionChanged(nextSample) {
    buildMetadata(nextSample)
    buildCharts(nextSample)
}


//Function for initialization



//Call init function
function init() {
    //Get a ref to dropdown selector in the Test ID 
    var selector = d3.select("#selDataset");

    //Create a dropdown menu with all samples
    d3.json("./data/samples.json").then((data) => {
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
        buildCharts(firstSample);
    });
}
init();