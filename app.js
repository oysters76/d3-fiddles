width = 800 
height = 600 

const params = d3.select("body")
			.append("div")
			  .attr("style", "width:100%;display:flex;height:10%;align-items:center;"); 


params.append("label")
	.text("Size of Rectangles: ")

params.append("input")
	.attr("id", "txt_rect")
	.attr("style", "height:25%;width:10%;")
	.attr("type", "number")
	.attr("min", "15");

params.append("label")
	.attr("style", "margin-left:15px")
        .text("Size of Circle: ")

params.append("input")  
        .attr("style", "height:25%;width:10%;")
	.attr("id", "txt_circle")
        .attr("type", "number")  
        .attr("min", "100");

params.append("label")
	.attr("style", "margin-left:15px")
	.text("Color:")

params.append("input")
	.attr("type", "color")
	.attr("id", "txt_color")

params.append("button")
        .text("Update")
	.attr("style", "margin-left:20px;padding:10px;")
	.attr("onclick", "update(event)"); 


let svg = d3.select("body")
  		.append("svg")
  			.attr("width", width)
			.attr("height", height); 

rectSize = 15 
circleRadius = 250 
update(); 

function update(){
	cr = txt_circle.value == "" ? circleRadius : parseInt(txt_circle.value);
        rsize = txt_rect.value == "" ? rectSize : parseInt(txt_rect.value); 
        rcolor = txt_color.value; 
const rectDataVertical = d3.range(0, width, rsize*2);
const rectDataHorizontal = d3.range(0, height, rsize*2);

svg.remove(); 

svg = d3.select("body")
                .append("svg")
                        .attr("width", width)
                        .attr("height", height); 


const mask1 = svg.append("mask")
                        .attr("id", "mask1");

mask1.append("rect")
      .attr("width", width)                          
      .attr("height", height)                          
      .attr("fill", "black");                         

mask1.append("circle")                                         
      .attr("cx", width/2)                                          
      .attr("cy", height/2)                                          
      .attr("r", cr)                                          
      .attr("fill", "white");  

const mask2 = svg.append("mask")
                        .attr("id", "mask2");
	
mask2.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white");

mask2.append("circle")
      .attr("cx", width/2)
      .attr("cy", height/2)
      .attr("r", cr)
      .attr("fill", "black"); 


svg.append("g")
   .selectAll("rect")
   .data(rectDataVertical)
   .join("rect")
     .attr("width", rsize)
     .attr("height", height)
     .attr("x", d => d)
     .attr("y", 0)
     .attr("fill", rcolor)	
     .attr("mask", "url(#mask2)");

svg.append("g")
   .selectAll("rect")
   .data(rectDataHorizontal)
   .join("rect")
     .attr("width", width)
     .attr("height", rsize)
     .attr("x", 0)
     .attr("y", d => d)
     .attr("fill", rcolor)	
     .attr("mask", "url(#mask1)");

}
