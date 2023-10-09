const width = 1000; 
const height = 1000; 
let pointSize = 1; 
const pointRadius = 2; 
const maxPointSize = 100; 

function getRandomPoint(minBound, maxBound)
{
 return Math.round(d3.randomUniform(minBound, maxBound)()); 
}

function getPoint(width, height)
{
 return {x: getRandomPoint(1, width), y: getRandomPoint(1, height)}; 
}

function isEqual(point1, point2)
{
 return point1.x == point2.x && point1.y == point2.y; 
}

function getDataForLineFrom(src, dest)
{
 return {
	x1: src.x,
	y1: src.y, 
	x2: dest.x,
	y2: dest.y,
	style: getRandomLineStyle() 
 }
}

function getLineStyle(color, width)
{
 return "stroke:" + color + ";stroke-width:"+width; 
}

function getRandomColor()
{
 const vals = d3.range(0, 3).map(ind=>Math.round(d3.randomUniform(0,255)()));
 return "rgb(" + vals[0] + "," + vals[1] + "," + vals[2] + ")"; 
}

function getRandomLineWidth()
{
 return Math.round(d3.randomUniform(1,5)()); 
}

function getRandomLineStyle()
{
 return getLineStyle(getRandomColor(), getRandomLineWidth()); 
}

function getLinesForPoint(point, points)
{
 let lines = []; 
 for (let i = 0; i < points.length; i++)
 {
   const cPoint = points[i]; 
   if (isEqual(point, cPoint))
	continue;  
   lines.push(getDataForLineFrom(point, cPoint)); 	 
 }
 return lines;
}

function animate()
{
 //we need to clear svg element first before re-draw! 
 	
 if (pointSize > maxPointSize)
	pointSize = 1;
 d3.selectAll("svg").remove();	
 const svg = d3.select("body")
		.append("svg")
			.attr("width", width)
			.attr("height", height);
	
// populate random points throughout the svg canvas 
const points = d3.range(1,pointSize).map(point=>getPoint(width,height)); 


// draw the random points on the svg element 
svg.append("g")
	.selectAll("circle")
		.data(points)
			.join("circle")
				.attr("cx", d=>d.x)
				.attr("cy", d=>d.y)
				.attr("r", pointRadius)

//draw lines connecting every point to every other point
const lines = points.map(point=>getLinesForPoint(point, points)).flat(); 

svg.append("g")
	.selectAll("line")
		.data(lines)
			.join("line")
			   .attr("x1", d=>d.x1)
			   .attr("y1", d=>d.y1)
			   .attr("x2", d=>d.x2)
			   .attr("y2", d=>d.y2)
			   .attr("style", d=>d.style);

 pointSize += 1;
}

let start = null;
function step(timestamp){
 if (start == null)
	start = timestamp;
 console.log(timestamp)	
 const elapsed = timestamp - start;	
 if (elapsed >= 500)
 {
   start = timestamp; 
   animate(); 	 	 
 }
 window.requestAnimationFrame(step);	
}


//need to animate this, increase pointSize per each frame 
window.requestAnimationFrame(step); 
