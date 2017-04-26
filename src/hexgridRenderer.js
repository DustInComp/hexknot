function HexgridRenderer(canvas, grid, scale=100) {
  this.ctx = canvas.getContext("2d");
  this.grid = grid;
  this.scale = scale;
}

HexgridRenderer.prototype = {
  draw: function() {
    this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0; i < this.grid.spaces.length; i++) {
      var space = this.grid.spaces[i];
      var hexCenterX = this.grid.anchorX + this.scale * (3*space.x + 1.5*(space.y%2));
      var hexCenterY = this.grid.anchorY + this.scale*Math.cos(Math.PI/6) * space.y;

      if (space.tile) {
        this.drawLinesAt( space.tile.lines, hexCenterX, hexCenterY, 0, 4, 8, "#ffffff", 6, "#000000" );
      }

      this.drawHexAt( space, hexCenterX, hexCenterY, 0, 4, 2);
    }
  },

  drawHexAt: function(hex, x, y, rot=0, space=0, width=2, color="#000000") {
    var c = this.ctx;
    var radius = this.scale - space/2;
    c.strokeStyle = color;
    c.lineWidth = width;
    c.beginPath();
    c.moveTo(
      x + radius*Math.sin( -Math.PI/6 + rot ) + randomOffset(1),
      y - radius*Math.cos( -Math.PI/6 + rot ) + randomOffset(1));
    for (var i = 1; i < 6; i++)
      c.lineTo(
        x + radius*Math.sin( -Math.PI/6 + rot + Math.PI/3*i ) + randomOffset(1) ,
        y - radius*Math.cos( -Math.PI/6 + rot + Math.PI/3*i ) + randomOffset(1) );
    c.closePath();
    c.stroke();
  },

  drawLinesAt: function(lines, x, y, rot=0, space=0, width=6, color="#000000", width2, color2) {
    var c = this.ctx;
    var r = this.scale - space/2;
    var PI = Math.PI;
    var lAlpha = Math.atan(1 / (2 * Math.sqrt(3))); // That angle needed
    var lRadiusFac = Math.sqrt(13)/4;

    var renderedLines = lines.filter(l=>l[0]<=l[1]);
    for (var i = 0; i < renderedLines.length; i++) {
      var line = renderedLines[i];
      var sttAngle = PI/3 * (line[0]/2|0) + (line[0]%2||-1)*lAlpha ;
      var endAngle = PI/3 * (line[1]/2|0) + (line[1]%2||-1)*lAlpha ;

      c.beginPath();
      c.moveTo(
        x + r*lRadiusFac * Math.sin( rot + sttAngle ),
        y - r*lRadiusFac * Math.cos( rot + sttAngle ));
      c.bezierCurveTo(
        x + r/2 * Math.sin( rot + PI/3*(line[0]/2|0) + PI/6*(line[0]%2||-1) ) + randomOffset(2),
        y - r/2 * Math.cos( rot + PI/3*(line[0]/2|0) + PI/6*(line[0]%2||-1) ) + randomOffset(2),
        x + r/2 * Math.sin( rot + PI/3*(line[1]/2|0) + PI/6*(line[1]%2||-1) ) + randomOffset(2),
        y - r/2 * Math.cos( rot + PI/3*(line[1]/2|0) + PI/6*(line[1]%2||-1) ) + randomOffset(2),
        x + r*lRadiusFac * Math.sin( rot + endAngle ),
        y - r*lRadiusFac * Math.cos( rot + endAngle ));
      c.lineWidth = width;
      c.strokeStyle = color;
      c.stroke();
      if (width2 || color2) {
        c.lineWidth = width2;
        c.strokeStyle = color2;
        c.stroke();
      }
    }
  }
}
function randomOffset( f ) {
  return Math.random()*f-f/2;
}
