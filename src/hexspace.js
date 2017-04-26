function HexSpace( x, y, tile=null ) {
  this.x = x;
  this.y = y;
  this.tile = tile;
}

HexSpace.prototype = {
  isEmpty: () => this.tile == null,
}
