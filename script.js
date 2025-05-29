function draw() {
    var cv = document.getElementById('cv');
    var ct = cv.getContext('2d');
    
    var w = cv.width;
    var h = cv.height;

    var minX = 111300;
    var minY = 111300;
    ct.clearRect(0, 0, w, h);
    ct.fillStyle = 'rgba(0, 255, 0, 1.0)';
    ct.lineWidth = 2;
    var text = document.getElementById("data").innerText;
    var lines = text.split("Warning:");
    var scale = 2.0;
    function drawRect(x1, y1, x2, y2)
    {
    	ct.rect((x1-minX+50)*scale, (y1-minY+50)*scale, (x2-x1)*scale, (y2-y1)*scale);
    }
    
    var allCoords = [];
    var allSynced = [];
    var allRecalc = [];
    lines.forEach(function(line) {
    	let isSynced = false;
      let isRecalc = false;
    	var coordsPart = line.indexOf("UpdateHeightMapUnsynced");
      if (coordsPart == -1) {
      	coordsPart = line.indexOf("UpdateHeightMapSynced");
        isSynced = true;
      }
      if (coordsPart == -1) {
      	coordsPart = line.indexOf("RecalcArea");
        isSynced = false;
        isRecalc = true;
      }
      if (coordsPart > -1) {
      	var coordsText = line.substring(coordsPart);
        var start = coordsText.indexOf(" ")+1;
        var end = coordsText.indexOf("[");
        if (end == -1) {
        	end = coordsText.lenght;
        } else {
          end = end - 1;
        }
        var coords = coordsText.trim().substring(start, end).split(" ");
        coords = coords.map(function(x) {
        	return parseInt(x);
        });
        minX = Math.min(minX, coords[0]);
        minY = Math.min(minY, coords[1]);
        if (isSynced || isRecalc) {
        	if (isSynced) {
            allSynced.push(coords);
          } else {
            allRecalc.push(coords);
          }
        } else {
        	allCoords.push(coords);
        }
        
      }
    });


    ct.strokeStyle = 'rgba(255, 127, 127, 0.7)';
    ct.beginPath();
    allRecalc.forEach(function(coords) {
    	drawRect(coords[0], coords[1], coords[2], coords[3]);
    });
    ct.stroke();

    ct.strokeStyle = 'rgba(127, 255, 127, 0.7)';
    ct.beginPath();
    allSynced.forEach(function(coords) {
    	drawRect(coords[0], coords[1], coords[2], coords[3]);
    });
    ct.stroke();




    ct.strokeStyle = 'rgba(127, 127, 255, 0.5)';
    ct.beginPath();
    allCoords.forEach(function(coords) {
    	drawRect(coords[0], coords[1], coords[2], coords[3]);
    });
    ct.stroke();

}

draw();
