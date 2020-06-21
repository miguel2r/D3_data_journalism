// @TODO: YOUR CODE HERE!

function static_chart()  {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};





var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;



//function static_chart() {


        // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
        var svg = d3.select("#scatter0")
          .append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight)
          .attr("style","border: 1px solid #cccccc");

          // a g (svg element group ) is created

        var chartGroup = svg.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);


        // Import Data, be sure su open a web server using python
        d3.csv("data/data.csv").then(function(data)

        {

                  // Step 1: Parse Data/Cast as numbers
                  // ==============================
                  data.forEach(function(data) {
                    data.poverty = +data.poverty;
                    data.healthcare = +data.healthcare;
                  });


                

            // Step 2: Create scale functions
            // ==============================
                  var xLinearScale = d3.scaleLinear()
                    .domain([8, d3.max(data, d => d.poverty)])
                    .range([0, width]);

                    max_x=d3.max(data, d => d.poverty)
                    console.log("max_x", max_x)

                  var yLinearScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.healthcare)])
                    .range([height, 0]);

                    max_y=d3.max(data, d => d.healthcare)
                    console.log("max_y", max_y)
                    console.log("xlinear", xLinearScale, "ylienar",yLinearScale)   
                

                  // Step 3: Create axis functions
                  // ==============================
                  var bottomAxis = d3.axisBottom(xLinearScale);
                  var leftAxis = d3.axisLeft(yLinearScale);

                  // Step 4: Append Axes to the chart
                  // ==============================
                  chartGroup.append("g")
                    .attr("transform", `translate(0, ${height})`) 
                    .call(bottomAxis); 

                  chartGroup.append("g")
                
                    .call(leftAxis); 

                  // Step 5: Create Circles
                  // ==============================
          
              
                  var circlesGroup = chartGroup.selectAll("miguel")
                
                .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", d => xLinearScale(d.poverty))
                  .attr("cy", d => yLinearScale(d.healthcare))
                  .attr("r", "15")   //circle radious 
                  .attr("fill", "red")
                  .attr("opacity", ".4");  


                  var txtGroup = chartGroup.selectAll("andrea")
                  .data(data)
                  .enter()
                  .append("text")
                  .attr("x", e => xLinearScale(e.poverty))
                  .attr("y", e => yLinearScale(e.healthcare))
                  .attr("text-anchor","middle")
                  .attr("font-size","10px")
                  .attr("dy",".3em")
                  .text(function(e) { return e.abbr; });


              
                  /*

                  // Step 6: Initialize tool tip
                  // ==============================
                var toolTip = d3.tip()
                    .attr("class", "tooltip")
                    .offset([80, -60])
                    .html(function(d) {
                      return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
                    });




              
                    // Step 7: Create tooltip in the chart
                    // ==============================
                    chartGroup.call(toolTip);

                    // Step 8: Create event listeners to display and hide the tooltip
                    // ==============================
                    circlesGroup.on("mouseover", function(data) {
                      toolTip.show(data, this);
                    })
                      // onmouseout event
                      .on("mouseout", function(data, index) {
                        toolTip.hide(data);
                      });*/



            // Create axes labels
            chartGroup.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left + 7)
              .attr("x", 0 - (height / 2))
              .attr("dy", "1em")
              .attr("class", "axisText")
              .text("Lacks Healthcare (%)");

            chartGroup.append("text")
              .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
              .attr("class", "axisText")
              .text("In Poverty (%)");




          }).catch(function(error) {console.log(error);}); // end load data statict chart


          


 }  // end of static_chart function
 
 

 static_chart()  
 
 main_process()  







  // =======DINAMIC =========

       
function setup_canvas() {
     
      var svgWidth = 960;
      var svgHeight = 500;

      var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 170
      };


      // space reserved for the proper chart

      var width = svgWidth - margin.left - margin.right;
      var height = svgHeight - margin.top - margin.bottom;

      // Create an SVG wrapper, append an SVG group that will hold our chart,
      // and shift the latter by left and top margins into HTML
      var svg = d3
        // .select(".chart")
        .select("#scatter1")


        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("style","border: 1px solid #cccccc");

      // Append an SVG group

   
      var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
      // Initial Params
      var chosenXAxis = "poverty";
      //var chosenYAxis = "healthcare";
      var chosenYAxis = "smokes";
     
      var varobj = {
        width: width,
        height: height ,
        chartGroup: chartGroup,
        chosenXAxis:chosenXAxis,
        chosenYAxis:chosenYAxis,
        margin:margin
      };  
      return varobj;

}  // setup_canvas





// function used for updating x-scale var upon click on axis label
function xScale(data_file, chosenXAxis,width) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data_file, d => d[chosenXAxis]) * 0.8,
             d3.max(data_file, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;


} 


// function used for updating y-scale var upon click on yxis label
function  yScale(data_file, chosenYAxis, height) {
// create scales

if (chosenYAxis == "smokes") {

var y1LinearScale = d3.scaleLinear()

.domain([d3.min(data_file, d => d[chosenYAxis]) *  0.1,  //0.8
         d3.max(data_file, d => d[chosenYAxis]) * 3  //1.2
])
.range([height, 10]);

}

else {

  var y1LinearScale = d3.scaleLinear()

  .domain([d3.min(data_file, d => d[chosenYAxis]) *  0.1,  //0.8
           d3.max(data_file, d => d[chosenYAxis]) * 1.2  //1.2
  ])
  .range([height, 10]);
}

//here review 

return y1LinearScale;


} //  end yScale function






// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}  



// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}  





// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {


  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
} 

// update the dom for x circle label

function labrenderCircles(txtGroup, newXScale, chosenXAxis) {
  txtGroup.transition()
  .duration(1000)
  .attr("x", d => newXScale(d[chosenXAxis]));

return txtGroup;
}               
                






// function used for updating circles group with a transition to
// new circles
function yrenderCircles(circlesGroup, newYScale, chosenYAxis) {


  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

    console.log (" cy paint")

  return circlesGroup;
} 


// update the dom for x circle label

function ylabrenderCircles(txtGroup, newYScale, chosenYAxis) {
  txtGroup.transition()
  .duration(1000)
  .attr("y", d => newYScale(d[chosenYAxis]));

return txtGroup;
}               
                









/*


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "poverty") {
    label = "Hair Length:";
  }
  else {
    label = "# of Albums:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

*/

function main_process() 
{
 

    // Retrieve data from the CSV file and execute everything below
    d3.csv("data/data.csv").then(function(data_file, err) {
      if (err) throw err;

      // parse data
        data_file.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.income = +data.income;
      //  console.log("data", data.poverty )
      });
       
      // reserve the chart space, magins, width, heigh
      var svg_var = setup_canvas()
      dinamic_chart(data_file, svg_var)

    }).catch(function(error) {console.log(error);}); // end load process

} //end main_process() function




function dinamic_chart(data_file, svg_var ){ 
     

              // xLinearScale function above csv import  passing the initial x value  
              var xLinearScale = xScale(data_file, svg_var.chosenXAxis,svg_var.width);   

              // yLinearScale function above csv import  passing the initial y value 
              var yLinearScale = yScale(data_file, svg_var.chosenYAxis,svg_var.height);  


              // Create   the initial axis functions
              var bottomAxis = d3.axisBottom(xLinearScale);
              var leftAxis = d3.axisLeft(yLinearScale);


              // append x axis  scale (line) based on data 
              var xAxis = svg_var.chartGroup.append("g")
                .classed("x-axis", true)
                .attr("transform", `translate(0, ${svg_var.height})`)
                .call(bottomAxis);
        

              // append y axis scale (draw a line) base on data
              //svg_var.chartGroup.append("g")

              
              var yAxis =  svg_var.chartGroup.append("g")
                .classed("y-axis", true)
        
                //.attr("transform", `translate(${svg_var.width},0)`)


                .call(leftAxis);
                                   
               console.log("initial Y", svg_var.chosenYAxis)
              // append initial circles
              var circlesGroup =svg_var.chartGroup.selectAll("circle")
                .data(data_file)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d[svg_var.chosenXAxis]))
                //.attr("cy", d => yLinearScale(d.healthcare))
                .attr("cy", d => yLinearScale(d[svg_var.chosenYAxis]))
                .attr("r", 15)
                .attr("fill", "red")
                .attr("opacity", ".5");

                var txtGroup = svg_var.chartGroup.selectAll("andrea")
                .data(data_file)
                .enter()
                .append("text")
                .attr("x", e => xLinearScale(e[svg_var.chosenXAxis]))
                .attr("y", e => yLinearScale(e[svg_var.chosenYAxis]))
                .attr("text-anchor","middle")
                .attr("font-size","10px")
                .attr("dy",".3em")
                .text(function(e) { return e.abbr; });











  

              // Create group for 3 x-axis labels  (text below the graph)
              var xlabelsGroup = svg_var.chartGroup.append("g")
                .attr("transform", `translate(${svg_var.width / 2}, ${svg_var.height + 20})`);

              var xPovertyLabel = xlabelsGroup.append("text")
                .attr("x", 0)
                .attr("y", 20)
                .attr("value", "poverty") // value to grab for event listener
                .classed("active", true)
                .text("In Poverty (%)");

              var xAgeLabel = xlabelsGroup.append("text")
                .attr("x", 0)
                .attr("y", 40)
                .attr("value", "age") // value to grab for event listener
                .classed("inactive", true)
                .text("Age Median (%)");

              var xIncomeLabel = xlabelsGroup.append("text")
                .attr("x", 0)
                .attr("y", 60)
                .attr("value", "income") // value to grab for event listener
                .classed("inactive", true)
                .text("House Hold Income");
                
                wx= 200
                hy =220
               // Create group for 3 y -axis labels  (text right next to the graph)
              var ylabelsGroup = svg_var.chartGroup.append("g")
             //.attr("transform", `translate(${svg_var.width / 4}, ${svg_var.height + 20})`);
             .attr("transform", `translate(${wx / 2}, ${hy + 20})`);

              var yobesityLabel =  ylabelsGroup.append("text") //svg_var.chartGroup.append("text")
               .attr("transform", "rotate(270)")
              .attr("y", 1 - svg_var.margin.left)
              .attr("x", 250 - (svg_var.height / 2))
             
              .attr("value", "obesity")
              //.attr("dy", "1em")
              .classed("axis-text", true)
              .text("Obesse (%)");

              var ysmokesLabel =  ylabelsGroup.append("text") //svg_var.chartGroup.append("text")
              .attr("transform", "rotate(270)")
              .attr("y", 5 - svg_var.margin.left)
              .attr("x", 250 - (svg_var.height / 2))
              .attr("dy", "1em")
              .attr("value", "smokes")
              .classed("axis-text", true)
              .text("Smokers (%)");

              var yhealthcareLabel = ylabelsGroup.append("text")// svg_var.chartGroup.append("text")
                .attr("transform", "rotate(270)")
                .attr("y", 20 - svg_var.margin.left)
                .attr("x", 250 - (svg_var.height / 2))
                .attr("dy", "1em")
                .attr("value", "healthcare")
                .classed("axis-text", true)
                .text("Lacks Healhcare (%)");

            





              // updateToolTip function above csv import
            //  var circlesGroup = updateToolTip(svg_var.chosenXAxis, circlesGroup);

              // x axis labels event listener
              xlabelsGroup.selectAll("text")
                .on("click", function() {

                  // get value of selection
                  var value = d3.select(this).attr("value");
                  console.log ("X Chosen Value",value )

                  if (value !== svg_var.chosenXAxis) {
                    console.log ("X Old Value :",svg_var.chosenXAxis )
                    // replaces chosenXAxis with value
                    svg_var.chosenXAxis = value;

                    // console.log(chosenXAxis)

                    // functions here found above csv import
                    // updates x scale for new data
                    xLinearScale = xScale(data_file, svg_var.chosenXAxis,svg_var.width);

                    // updates x axis with transition
                    xAxis = renderAxes(xLinearScale, xAxis);

                    // updates circles with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, svg_var.chosenXAxis);
                

                   // update the circle label
                   txtGroup = labrenderCircles(txtGroup, xLinearScale, svg_var.chosenXAxis);
                









                    // updates tooltips with new info
                //    circlesGroup = updateToolTip(svg_var.chosenXAxis, circlesGroup);
                  
                    // changes classes to change bold text
                  if (svg_var.chosenXAxis === "poverty") {
                      xPovertyLabel
                        .classed("active", true)
                        .classed("inactive", false);
                        xAgeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    }
                    else {
                      xPovertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        xAgeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    } //if bold text


                  }  //if selection

              }); //end click event



              
                // =======y axis labels event listener=========
                ylabelsGroup.selectAll("text")
                .on("click", function() {

                  // get value of selection
                  var value = d3.select(this).attr("value");
                  console.log ("y Chosen Value",value )

               
               
                  if (value !== svg_var.chosenYAxis) {
                    console.log ("y Old Value :",svg_var.chosenYAxis )
                    // replaces chosenYAxis with value
                    svg_var.chosenYAxis = value;
                     console.log(svg_var.chosenYAxis)

                    // functions here found above csv import
                    // updates x scale for new data
               //     xLinearScale = xScale(data_file, svg_var.chosenXAxis,svg_var.width);
                      yLinearScale = yScale(data_file, svg_var.chosenYAxis, svg_var.height) 

                    // updates y axis with transition
                //    xAxis = renderAxes(xLinearScale, xAxis);
                      yAxis = renderYAxes(yLinearScale, yAxis);

                    // updates circles with new y values
                    circlesGroup = yrenderCircles(circlesGroup, yLinearScale, svg_var.chosenYAxis);

                  // update the circle y  coordinate label
                   txtGroup = ylabrenderCircles(txtGroup, yLinearScale, svg_var.chosenYAxis);
                










                   // updates tooltips with new info
                  //  circlesGroup = updateToolTip(svg_var.chosenXAxis, circlesGroup);
                  
                    // changes classes to change bold text
                  if (svg_var.chosenYAxis === "healthcare") {
                    yhealthcareLabel
                        .classed("active", true)
                        .classed("inactive", false);
                        ysmokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    }
                    else {
                      yhealthcareLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        ysmokesLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    } //if bold text


                  } //if value end 


                  }); // y event  end section

} //end dinamic_chart


//main_process()   