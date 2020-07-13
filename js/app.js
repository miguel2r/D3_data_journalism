//Written by Miguel Rojas --

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
        // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
        var svg = d3.select("#scatter1")
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


                  var yLinearScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.healthcare)])
                    .range([height, 0]);

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

                  // Step 5: Create Circles group
                  var circlesGroup = chartGroup.selectAll("miguel")
                
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", d => xLinearScale(d.poverty))
                  .attr("cy", d => yLinearScale(d.healthcare))
                  .attr("r", "15")   //circle radious 
                  .attr("fill", "red")
                  .attr("opacity", ".4");  

                  // create text inside the circle group
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
 
 
       
function setup_canvas() {
     
      var svgWidth = 960;
      var svgHeight = 500;

      var margin = {
        top: 20,
        right: 40,
        bottom: 100,
        left: 110
      };

      // space reserved for the proper chart

      var width = svgWidth - margin.left - margin.right;
      var height = svgHeight - margin.top - margin.bottom;

      // Create an SVG wrapper, append an SVG group that will hold our chart,
      // and shift the latter by left and top margins into HTML
      var svg = d3
        // .select(".chart")
        .select("#scatter2")
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



function setup_canvas2() {
     
  var svgWidth = 960;
  var svgHeight = 500;

  var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 110
  };

  // space reserved for the proper chart

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins into HTML
  var svg = d3

    .select("#scatter3")
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
 
//"obesity" //"smokes"

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
    .domain([d3.min(data_file, d => d[chosenXAxis]) * 0.97,
             d3.max(data_file, d => d[chosenXAxis]) //* 1.2
    ])
    .range([0, width]);

  return xLinearScale;


} 


// function used for updating y-scale var upon click on yxis label
function  yScale(data_file, chosenYAxis, height) {
// create scales



  console.log("Choseeya",chosenYAxis)
  var y1LinearScale = d3.scaleLinear()

  // 0.8 reduces the domain of yscale at starting point
  .domain([d3.min(data_file, d => d[chosenYAxis]) *  0.8, 
           d3.max(data_file, d => d[chosenYAxis]) 
  ])
  .range([height, 0]);

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
                



// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup,data_file,chosenYAxis) {

  var label;
  switch(chosenXAxis) {
    case "poverty":
      labelx = "Poverty";
      break;
    case "age":
      labelx = "Age";
      break;

    case "income":
      labelx = "income";
      break;
    default:
      // code block
  }

  switch(chosenYAxis) {
    case "smokes":
      labely = "Smokes";
      break;
    case "obesity":
      labely = "obesity";
      break;

    case "healthcare":
      labely = "Healthcare";
      break;
    default:
      // code block
  }

  
  // Step 1: Append tooltip div
    var toolclear = d3.select("div").select("tooltip")

    if (!toolclear.empty()) {
      toolclear.remove();
  }

  var toolTip = d3.select("body")
  .append("div")
  .classed("tooltip", true);



  
  
     // Step 2: Create "mouseover" event listener to display tooltip
     circlesGroup.on("mouseover", function(d) {
      toolTip.style("display", "block")
      toolTip.transition()
      .duration(100)
      //.style("color", "blue");
      .style("opacity", 9);
       toolTip.html( `<strong>State: ${d.state}` + `<br> ${labelx} ${d[chosenXAxis]}`+ `<br>${labely} ${d[chosenYAxis]}`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
      // Step 3: Create "mouseout" event listener to hide tooltip
     .on("mouseout", function() {
       toolTip.style("display", "none");
  
       toolTip.transition()
       .duration(50)
       .style("opacity", 5);
  
      }); // mouseover 
    
  

  return circlesGroup;
}


function dinamic_chart() 
{
 

    // Retrieve data from the CSV file and execute everything below
    d3.csv("data/data.csv").then(function(data_file, err) {
      if (err) throw err;

      // parse data, so you can use it as numeric value to calculate the scales and 
      // represent  points into the graph canvas
        data_file.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;

      });
       
      // reserve the chart space, magins, width, heigh
      var svg_var = setup_canvas()
      dinamic_chart_draw(data_file, svg_var)
      var svg_var = setup_canvas2()
      dinamic_chart_draw_tp(data_file, svg_var)


    }).catch(function(error) {console.log(error);}); // end load process

} //end main_process() function




function dinamic_chart_draw(data_file, svg_var ){ 
     

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
        
               // .attr("transform", `translate(1,${svg_var.width}),0`)
               //.attr("transform", `translate(1,${svg_var.width}),0`)

                .call(leftAxis);
                                   
              // append initial circles
              var circlesGroup =svg_var.chartGroup.selectAll("circle")
                .data(data_file)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d[svg_var.chosenXAxis]))
                .attr("cy", d => yLinearScale(d[svg_var.chosenYAxis]))
                .attr("r", 15)
                .attr("fill", "green")
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
                
                
               // Create group for 3 y -axis labels  (text right next to the graph)
              var ylabelsGroup = svg_var.chartGroup.append("g")
            // .attr("transform", `translate(${svg_var.width}, ${svg_var.height })`);
           //  .attr("transform", `translate(${wx / 2}, ${hy + 20})`);

             var ysmokesLabel =  ylabelsGroup.append("text") //svg_var.chartGroup.append("text")
              .attr("transform", "rotate(270)")
              .attr("y",20 - svg_var.margin.left)
              .attr("x", 100 - (svg_var.height  ))
              .attr("dy", "1em")
              .attr("value", "smokes")
              .classed("active", true)
              //.classed("axis-text", true)
              .text("Smokers (%)");

              var yobesityLabel =  ylabelsGroup.append("text") //svg_var.chartGroup.append("text")
               .attr("transform", "rotate(270)")
               .attr("y", 35   - svg_var.margin.left)
               .attr("x", 100 - (svg_var.height ))
               .attr("dy", "1em")
               .attr("value", "obesity")
               .classed("axis-text", true)
               .text("Obesse (%)");


              var yhealthcareLabel = ylabelsGroup.append("text")// svg_var.chartGroup.append("text")
                .attr("transform", "rotate(270)")
                .attr("y", 50 - svg_var.margin.left)
                .attr("x", 100 - (svg_var.height))
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

               

                    // functions here found above csv import
                    // updates x scale for new data
                    xLinearScale = xScale(data_file, svg_var.chosenXAxis,svg_var.width);

                    // updates x axis with transition
                    xAxis = renderAxes(xLinearScale, xAxis);

                    // updates circles with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, svg_var.chosenXAxis);
                

                   // update the circle label
                   txtGroup = labrenderCircles(txtGroup, xLinearScale, svg_var.chosenXAxis);

                  //changes classes to change bold text
                  //change it by    a switch


                   switch(svg_var.chosenXAxis) {
                    case "poverty":
                      xPovertyLabel
                        .classed("active", true)
                        .classed("inactive", false);
                      xAgeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                      xIncomeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                      break;
                    case "income":
                      xIncomeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                      xAgeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                      xPovertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                      break;
                      case "age":                    
                        xAgeLabel
                          .classed("active", true)
                          .classed("inactive", false);
                        xPovertyLabel
                          .classed("active", false)
                          .classed("inactive", true);
                         xIncomeLabel
                          .classed("active", false)
                          .classed("inactive", true);
                        
                        break;
                    default:
                      // code block
                  }

                  }  //if selection

              }); //end click event

      // =======y axis labels event listener=========
                ylabelsGroup.selectAll("text")
                .on("click", function() {

                  // get value of selection
                  var value = d3.select(this).attr("value");
                  if (value !== svg_var.chosenYAxis) {
                    // replaces chosenYAxis with value
                    svg_var.chosenYAxis = value;

                    // functions here found above csv import
                    // updates x scale for new data
                      yLinearScale = yScale(data_file, svg_var.chosenYAxis, svg_var.height) 

                    // updates y axis with transition
                      yAxis = renderYAxes(yLinearScale, yAxis);

                    // updates circles with new y values
                    circlesGroup = yrenderCircles(circlesGroup, yLinearScale, svg_var.chosenYAxis);

                  // update the circle y  coordinate label
                    txtGroup = ylabrenderCircles(txtGroup, yLinearScale, svg_var.chosenYAxis);

                    // changes classes to change bold text


                    switch(svg_var.chosenYAxis) {
                      case "healthcare":
                       yhealthcareLabel
                        .classed("active", true)
                        .classed("inactive", false);
                       ysmokesLabel
                        .classed("active", false)
                        .classed("inactive", true);

                      yobesityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        break;

                      case "obesity":
                    
                       yobesityLabel
                        .classed("active", true)
                        .classed("inactive", false);
                       ysmokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
   
                       yhealthcareLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        break;

                      case "smokes":
                    
                       ysmokesLabel
                        .classed("active", true)
                        .classed("inactive", false);
                       yobesityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                       yhealthcareLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        break;


                        
                      default:
                        // code block
                    }

                  } //if value end 


                  }); // y event  end section

} //end dinamic_chart



/// tooltip chart
function dinamic_chart_draw_tp(data_file, svg_var ){ 
     

  // xLinearScale function above csv import  passing the initial x value  
  var xLinearScale = xScale(data_file, svg_var.chosenXAxis,svg_var.width);   

  // yLinearScale function above csv import  passing the initial y value 
  var yLinearScale = yScale(data_file, svg_var.chosenYAxis,svg_var.height);  


  // Create   the initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

 console.log("svg_var.height",svg_var.height)
  // append x axis  scale (line) based on data 
  var xAxis = svg_var.chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${svg_var.height})`)
    .call(bottomAxis);


  // append y axis scale (draw a line) base on data

  var yAxis =  svg_var.chartGroup.append("g")
    .classed("y-axis", true)

   //.attr("transform", `translate(200, ${svg_var.width})`)
   //.attr("transform", `translate(1,${svg_var.width}),0`)

    .call(leftAxis);
                       
   console.log("initial Y", svg_var.chosenYAxis)
  // append initial circles
  var circlesGroup =svg_var.chartGroup.selectAll("circle")
    .data(data_file)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[svg_var.chosenXAxis]))
    .attr("cy", d => yLinearScale(d[svg_var.chosenYAxis]))
    .attr("r", 15)
    .attr("fill", "blue")
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
 //.attr("transform", `translate(${svg_var.width}, ${svg_var.height+20 })`);
  //.attr("transform", `translate(${svg_var.width/2}, ${svg_var.height+20})`);

 var ysmokesLabel =  ylabelsGroup.append("text") //svg_var.chartGroup.append("text")
  .attr("transform", "rotate(270)")
  .attr("y",20 - svg_var.margin.left)
  .attr("x", 100 - (svg_var.height  ))
  .attr("dy", "1em")
  .attr("value", "smokes")
  .classed("active", true)
  //.classed("axis-text", true)
  .text("Smokers (%)");

  var yobesityLabel =  ylabelsGroup.append("text") //svg_var.chartGroup.append("text")
   .attr("transform", "rotate(270)")
   .attr("y", 35   - svg_var.margin.left)
   .attr("x", 100 - (svg_var.height ))
   .attr("dy", "1em")
   .attr("value", "obesity")
   .classed("axis-text", true)
   .text("Obesse (%)");


  var yhealthcareLabel = ylabelsGroup.append("text")// svg_var.chartGroup.append("text")
    .attr("transform", "rotate(270)")
    .attr("y", 50 - svg_var.margin.left)
    .attr("x", 100 - (svg_var.height))
    .attr("dy", "1em")
    .attr("value", "healthcare")
    .classed("axis-text", true)
    .text("Lacks Healhcare (%)");

     //updates tooltips with new info
     circlesGroup = updateToolTip(svg_var.chosenXAxis, circlesGroup,
                                  data_file,svg_var.chosenYAxis);
      
  // x axis labels event listener
  xlabelsGroup.selectAll("text")
    .on("click", function() {

      // get value of selection
      var value = d3.select(this).attr("value");
      console.log ("X Chosen Value",value )

      if (value !== svg_var.chosenXAxis) {
        // replaces chosenXAxis with value
        svg_var.chosenXAxis = value;


        // updates x scale for new data
        xLinearScale = xScale(data_file, svg_var.chosenXAxis,svg_var.width);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, svg_var.chosenXAxis);
    

       // update the circle label
       txtGroup = labrenderCircles(txtGroup, xLinearScale, svg_var.chosenXAxis);
    

        //updates tooltips with new info
        circlesGroup = updateToolTip(svg_var.chosenXAxis, circlesGroup,data_file,svg_var.chosenYAxis);
      
      //changes classes to change bold text

       switch(svg_var.chosenXAxis) {
        case "poverty":
          xPovertyLabel
            .classed("active", true)
            .classed("inactive", false);
          xAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          xIncomeLabel
            .classed("active", false)
            .classed("inactive", true);
          break;
        case "income":
          xIncomeLabel
            .classed("active", true)
            .classed("inactive", false);
          xAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          xPovertyLabel
            .classed("active", false)
            .classed("inactive", true);
          break;
          case "age":                    
            xAgeLabel
              .classed("active", true)
              .classed("inactive", false);
            xPovertyLabel
              .classed("active", false)
              .classed("inactive", true);
             xIncomeLabel
              .classed("active", false)
              .classed("inactive", true);
            
            break;
        default:
          // code block
      }

      }  //if selection

  }); //end click event



  
    // =======y axis labels event listener=========
    ylabelsGroup.selectAll("text")
    .on("click", function() {

      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== svg_var.chosenYAxis) {
        // replaces chosenYAxis with value
        svg_var.chosenYAxis = value;

        // functions here found above csv import
        // updates x scale for new data
        console.log("yScale 946",svg_var.height)
          yLinearScale = yScale(data_file, svg_var.chosenYAxis, svg_var.height) 

        // updates y axis with transition
          yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new y values
        circlesGroup = yrenderCircles(circlesGroup, yLinearScale, svg_var.chosenYAxis);

      // update the circle y  coordinate label
        txtGroup = ylabrenderCircles(txtGroup, yLinearScale, svg_var.chosenYAxis);

       // updates tooltips with new info
         
          circlesGroup = updateToolTip(svg_var.chosenXAxis, circlesGroup,data_file,svg_var.chosenYAxis);
      
        // changes classes to change bold text


        switch(svg_var.chosenYAxis) {
          case "healthcare":
           yhealthcareLabel
            .classed("active", true)
            .classed("inactive", false);
           ysmokesLabel
            .classed("active", false)
            .classed("inactive", true);

          yobesityLabel
            .classed("active", false)
            .classed("inactive", true);
            break;

          case "obesity":
        
           yobesityLabel
            .classed("active", true)
            .classed("inactive", false);
           ysmokesLabel
            .classed("active", false)
            .classed("inactive", true);

           yhealthcareLabel
            .classed("active", false)
            .classed("inactive", true);
            break;

          case "smokes":
        
           ysmokesLabel
            .classed("active", true)
            .classed("inactive", false);
           yobesityLabel
            .classed("active", false)
            .classed("inactive", true);
           yhealthcareLabel
            .classed("active", false)
            .classed("inactive", true);
            break;
 
          default:
            // code block
        }

      } //if value end 

      }); // y event  end section

} //end dinamic_chart






static_chart()  
dinamic_chart()  
