let temp = 0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getData);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

function getData(position) {
  let { latitude, longitude } = position.coords;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8e57553ac01b4148f2a766535e0cf774`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let text = `<h3>${response.name}, ${response.sys.country}</h3>
      <span class="temp celcius" id="temp" onclick="toggleDegree(this);">${(
        response.main.temp - 273.15
      ).toFixed(1)}°C</span>
      <p class="info">click to toggle</p>
      <p class="weather">${response.weather[0].main}</p>`;
      document.getElementById('data').innerHTML = text;

      temp = response.main.temp;
    });
}

getLocation();

function toggleDegree(e) {
  e.classList.toggle('celcius');
  if (e.classList.contains('celcius'))
    e.innerHTML = `${(temp - 273.15).toFixed(1)}°C`;
  else e.innerHTML = `${(((temp - 273.15) / 5) * 9 + 32).toFixed(1)}°F`;
}
