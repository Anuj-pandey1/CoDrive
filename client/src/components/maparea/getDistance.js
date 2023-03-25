import L from "leaflet";


function toRadian(degree) {
  return degree;
}

export function getDistanceFromLatlng(waypoints) {
  // return distance in meters 
    var sum = 0; 
  for (let i = 1; i < waypoints.length; i++) {
    
    const origin = waypoints[i-1], destination = waypoints[i];
    var lon1 = toRadian(origin.lng),
      lat1 = toRadian(origin.lat),
      lon2 = toRadian(destination.lng),
      lat2 = toRadian(destination.lat);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    sum += c * EARTH_RADIUS * 1000;
  }
  return sum;
}

export function sortFromLatlng(waypoints) {
  // return distance in meters
  const init = waypoints[0];

  waypoints.sort((a,b)=>{return getDistanceFromLatlng([a,init]) - getDistanceFromLatAndlng([b,init])});
  return waypoints;
}

export function getDistanceFromLatAndlng(waypoints) {
  // return distance in meters
  var sum =0; 
  for (let i = 1; i < waypoints.length; i++) {
    const origin = waypoints[i-1], destination = waypoints[i];
    var lon1 = toRadian(origin[1]),
      lat1 = toRadian(origin[0]),
      lon2 = toRadian(destination[1]),
      lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    sum += c * EARTH_RADIUS * 1000;
  }
  return sum;
}


export function sortFromLatAndlng(waypoints) {
  const init = waypoints[0];

  waypoints.sort((a,b)=>{return getDistanceFromLatlng([a,init]) - getDistanceFromLatAndlng( [b,init] )});
}
