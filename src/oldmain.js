Array.prototype.equals = function(arr) {
  return this.reduce( (equal, el, i) => equal && el == arr[i], true )
};
var PI = Math.PI;
var TAU = 2 * PI;
var lAlpha = Math.atan(1 / (2 * Math.sqrt(3))); // That other angle needed
var lRadiusFac = Math.sqrt(13)/4;

var canvas = document.createElement("canvas");
canvas.width = innerWidth - 16 - innerWidth%10;
canvas.height = innerHeight - 16 - innerHeight%10;
canvas.style.setProperty("width", Math.round(canvas.width / devicePixelRatio)+"px");
canvas.style.setProperty("height", Math.round(canvas.height / devicePixelRatio)+"px");
devicePixelRatio = 1;
var c = canvas.getContext("2d");

document.body.appendChild( canvas );

var currHexIndex = 0;
window.addEventListener("keydown", function(e){
  if (e.key == "ArrowLeft" && currHexIndex > 0)
    currHexIndex--;
  if (e.key == "ArrowRight" && currHexIndex < 10394)
    currHexIndex++;
  c.clearRect(295, 295, 210, 210);
  drawHex(hexes[currHexIndex], 400, 400);
});

var map = [];

var hexes = [];

function Hex(a,b,c,d,e,f=0) {
  this.distances = [a,b,c,d,e,f];

  this.lines = [];
  for (var i = 0; i < this.distances.length; i++) {

    var lStt = i;
    while (this.lines.map(l=>l[0]).includes(lStt)) lStt++;

    var lEnd = lStt+1;
    var restDist = this.distances[i];
    while (this.lines.map(l=>l[0]).includes(lEnd)
        || restDist-- > 0)
      lEnd++;

    this.lines.push([lStt, lEnd], [lEnd, lStt]);
  }

}

HexTile.prototype = {
  getDistsString : function() {
    return this.distances.map(n=>n.toString(11)).join("");
  }
}


function drawHex( hex, x=100, y=100, rot=0, r=100 ) {
  var center = { x: x, y: y };
  var lines = hex.lines.filter(l=>l[0]<l[1]);
  var slant = -PI/6;

  var rotOffWhole = rot + slant;

  // draw lines
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var sttAngle = PI/3 * (line[0]/2|0) + (line[0]%2||-1)*lAlpha ;
    var endAngle = PI/3 * (line[1]/2|0) + (line[1]%2||-1)*lAlpha ;

    c.strokeStyle = "#400000";
    c.globalCompositeOperation = "xor";
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo(
      center.x + r*lRadiusFac * Math.sin( rot + sttAngle ),
      center.y - r*lRadiusFac * Math.cos( rot + sttAngle ));
    c.bezierCurveTo(
      center.x + r/2 * Math.sin( rot + PI/3*(line[0]/2|0) + PI/6*(line[0]%2||-1) ),
      center.y - r/2 * Math.cos( rot + PI/3*(line[0]/2|0) + PI/6*(line[0]%2||-1) ),
      center.x + r/2 * Math.sin( rot + PI/3*(line[1]/2|0) + PI/6*(line[1]%2||-1) ),
      center.y - r/2 * Math.cos( rot + PI/3*(line[1]/2|0) + PI/6*(line[1]%2||-1) ),
      center.x + r*lRadiusFac * Math.sin( rot + endAngle ),
      center.y - r*lRadiusFac * Math.cos( rot + endAngle ));
    c.stroke();
  }

  // draw hexagon
  c.strokeStyle = "#000000";
  c.globalCompositeOperation = "source-over";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(
    center.x + r * Math.sin( rotOffWhole ),
    center.y - r * Math.cos( rotOffWhole ));
  for (var i = 0; i < 5; i++)
    c.lineTo(
      center.x + r * Math.sin( rotOffWhole + PI/3*(1+i) ),
      center.y - r * Math.cos( rotOffWhole + PI/3*(1+i) ));
  c.closePath();
  c.stroke();
}

for (var i = 0; i < 11; i++)
for (var j = 0; j < 9; j++)
for (var k = 0; k < 7; k++)
for (var l = 0; l < 5; l++)
for (var m = 0; m < 3; m++)
  hexes.push( new Hex(i,j,k,l,m) );

var uniqueHexes = [];
for (var i = 0; i < hexes.length; i++) {
  // c.fillStyle = "#"+hexes[i].getDistsString();
  var lines = hexes[i].lines;
  for (var j = 0; j < 6; j++) {
    lines = hexes[i].lines
      .map(l=>[(l[0]+j*2)%12, (l[1]+j*2)%12])
      .sort((a,b)=>b[0]-a[0]);
    c.fillStyle = "#" + lines.reduce((s,l)=>s+(s.indexOf(l[0].toString(12))>=0?"":l[1].toString(12)), "");
    if (i>=0 && i<2) console.log(lines.join(" "),"\n",
      "#" + lines.reduce((s,l)=>s+(s.indexOf(l[0].toString(12))>=0?"":l[1].toString(12)), ""), c.fillStyle);
    c.fillRect(2*(i%105)+212*j, 2*(i/105|0), 2, 2);
  }
  if (i>=0 && i<2) console.log("");
}
c.lineWidth = 1;
// c.strokeRect(10.5+13*(4000%105)-1, 10.5+11*(4020/105|0)-1, 260, 11)

console.log(hexes[4400].distances);
console.log(hexes[4400].lines);
// drawHex(hexes[4400], 200, 200);

canvas.addEventListener("click", function(e) {
  console.log(e.offsetX/2|0, e.offsetY/2|0, 105*(e.offsetY/2|0) + (e.offsetX/2|0),e);
  var hex = hexes[105*(e.offsetY/2|0) + (e.offsetX/2|0)];
  c.clearRect(295, 295, 210, 210);
  drawHex(hex, 400, 400);
});
