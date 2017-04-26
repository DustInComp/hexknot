function HexTile(a,b,c,d,e,f=0) {
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

HexTile.random = function() {
  return new HexTile(
    Math.random() * 11 |0,
    Math.random() * 9  |0,
    Math.random() * 7  |0,
    Math.random() * 5  |0,
    Math.random() * 3  |0
  )
}
