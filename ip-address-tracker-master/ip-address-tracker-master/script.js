var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function validateIP(ip) {
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

// Function to fetch and display data
function fetchData(ip) {
    $.getJSON(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8nczxR1PiLRJISmezl7aTOT7XnMcS&ipAddress=${ip}`, function(data) {
      // Display the data
      $('#ip-address').text(data.ip);
      $('#location').text(`${data.location.city}, ${data.location.region} ${data.location.postalCode}`);
      $('#timezone').text(data.location.timezone);
      $('#isp').text(data.isp);
  
      // Update the map
      map.setView([data.location.lat, data.location.lng], 13);

    //   Adds marker to map
    L.marker([data.location.lat, data.location.lng]).addTo(map);
    });
}
  
  // Get the user's IP address on initial page load
  $.getJSON('https://api.ipify.org?format=json', function(data) {
    fetchData(data.ip);
  });
  
  // Search for any IP address or domain
  $('.prompt').keypress(function (e) {
    if (e.which == 13) {
        var ip = $(this).val();
        if (validateIP(ip)) {
            fetchData(ip);
        } else {
            alert("Please enter a valid IP address.");
        }
    }
  });
