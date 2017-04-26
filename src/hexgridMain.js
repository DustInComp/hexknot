(function() {
  var canvas = document.createElement("canvas");
  // canvas.width = innerWidth - 16 - innerWidth%10;
  // canvas.height = innerHeight - 16 - innerHeight%10;
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.setProperty("width", innerWidth + "px");
  canvas.style.setProperty("height", innerHeight + "px");
  // canvas.style.setProperty("width", Math.round(canvas.width / devicePixelRatio)+"px");
  // canvas.style.setProperty("height", Math.round(canvas.height / devicePixelRatio)+"px");
  document.body.appendChild( canvas );

  var grid = new Hexgrid( 7, 20, 35, 25 );

  for (var i = 0; i < grid.spaces.length; i++) {
    grid.spaces[i].tile = HexTile.random();
  }
  console.log(grid);
  // grid.setSpacesArray([]);

  var renderer = new HexgridRenderer( canvas, grid, 50 );

  window.drawLoop = setInterval( function(){ renderer.draw(); }, 200 );
})();
