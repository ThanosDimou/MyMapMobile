        function onLocationFound(e){
            var radius = e.accuracy / 2;
            var coord = e.latlng.toString().split(',');
            var lat = coord[0].split('(');
            var lng = coord[1].split(')');
            
            var popup = L.popup()
                .setLatLng(e.latlng) 
                .setContent("You are HERE. Coordinates of you:" + lat + " " + lng +"</br>" )
                .openOn(map);
            var circle = new L.circle(e.latlng, radius).addTo(map)
                .bindPopup("You are within " + radius + " meters from the center of this area. Coordinates of you:" + lat + " " + lng +" " ).openPopup();
            
                circle.on('mouseover', onLocationFound);
    
    // wrap map.locate in a function    
            function locate() {
                map.locate({setView: true, maxZoom: 16});
            }   
    
    // call locate every 3 seconds... forever
            setInterval(locate,5000);    
            
        }
        
        function upload() {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "file");
            document.body.appendChild(x);
        }
        
        
        function clickOnMap(e){
            var coord = e.latlng.toString().split(',');
            var lat = coord[0].split('(');
            var lng = coord[1].split(')');
            alert("You clicked the map at LATITUDE: " + lat[1] + " and LONG: " + lng[0]);
            var text = window.prompt("Πληκτρολόγησε σχόλια");
            var marker = new L.marker(e.latlng, {draggable: true}).addTo(map)
                .bindPopup(text+"</br>" + '<img src="http://via.placeholder.com/150x150" />').openPopup();

            function newCoords(e) {
            document.getElementById('latitude').value = marker.getLatLng().lat;
            document.getElementById('longitude').value = marker.getLatLng().lng;
            };
            marker.on('dragend', newCoords);
	}


        
        function onLocationError(e) {
            alert(e.message);
        }
        
      
        function remove(e) {
             map.removeLayer(marker);
        }
        
       
    map.on('dbclick', remove);
    map.on('click', clickOnMap);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.locate({setView: true, maxZoom: 7});
    
    
