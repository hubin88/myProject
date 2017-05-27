var tangram=[
	{p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}],color:"#caff67"},
	{p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}],color:"#67becf"},
	{p:[{x:800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}],color:"#ef3d61"},
	{p:[{x:600,y:200},{x:600,y:600},{x:400,y:400}],color:"#f9f51a"},
	{p:[{x:400,y:400},{x:600,y:600},{x:400,y:800},{x:200,y:600}],color:"#a594c0"},
	{p:[{x:200,y:600},{x:400,y:800},{x:0,y:800}],color:"#fa8ecc"},
	{p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}],color:"#f6ca29"}
];	
var n=1.5;
var canvas=document.getElementById("myCanvas");
	canvas.width=800/n;
	canvas.height=800/n;
var context=canvas.getContext("2d");
for(var i=0;i<tangram.length;i++){
	draw(tangram[i],context);
}

function draw(piece,cxt){
	cxt.beginPath();
	cxt.moveTo(piece.p[0].x/n,piece.p[0].y/n);
	for(var i=1;i<piece.p.length;i++){
		cxt.lineTo(piece.p[i].x/n,piece.p[i].y/n);
	}
		cxt.closePath();
		
		cxt.fillStyle=piece.color;
		cxt.fill();
		
		cxt.strokeStyle="black";
		cxt.lineWidth=3;
		cxt.stroke();
	
}
