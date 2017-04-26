function Hexgrid(width, height, x=0, y=0) {
  this.anchorX = x;
  this.anchorY = y;
  this.spaces = [];

  for (var x = 0; x < width; x++){
    for (var y = 0; y < height; y++) {
      this.spaces.push( new HexSpace(x, y) );
    }
  }
}

Hexgrid.prototype = {
  indexOfSpace: function(x, y) {
    for (var i = 0; i < this.spaces.length; i++) {
      if (this.spaces[i].x==x && this.spaces[i].y==y) {
        return i;
      }
    }
    return -1;
  },

  spaceExists: function(x, y) {
    return this.spaces.reduce(
      (exists, space) => space.x==x && space.y==y || exists, false);
  },

  isEmpty: function(x, y) {
    return this.spaces[this.indexOfSpace(x, y)].isEmpty();
  },

  addSpace: function(x, y) {
    if ( !this.spaceExists(x, y) ) this.spaces.push( new HexSpace(x, y) );
  },

  removeSpace: function(x, y) {
    if ( this.spaceExists(x, y) ) {
      return this.spaces.splice( this.indexOfSpace(x, y), 1 );
    }
  },

  setSpacesArray: function( arr ) {
    this.spaces = arr.map( xy => new HexSpace(xy[0], xy[1], xy[2]||null) );
  }
}
