async function setBackgroundImage() {
  try {
    const res = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    if (!res.ok) throw new Error("Failed to fetch background image");
    const data = await res.json();

    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  } catch (error) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = "By: Dodi Achmad";
  }
}

async function getCryptoData() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
    if (!res.ok) throw new Error("Crypto data not available");
    const data = await res.json();

    document.getElementById("crypto").innerHTML = `
      <div id="crypto-top">
        <img src="${data.image.small}" alt="crypto icon"/>
        <span>${data.name}</span>
      </div>
      <p>🎯 $${data.market_data.current_price.usd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</p>
      <p>👆 $${data.market_data.high_24h.usd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</p>
      <p>👇$${data.market_data.low_24h.usd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</p>
    `;
  } catch (error) {
    console.error("Crypto error:", error);
  }
}

function updateTime() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-us", {
    timeStyle: "short",
  });
  document.querySelector(".time").textContent = formattedTime;
}

async function getWeather() {
  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await fetch(
          `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
        );
        if (!res.ok) throw new Error("Weather data not available");

        const data = await res.json();
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weather").innerHTML = `
          <img src=${iconUrl} />
          <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
          <p class="weather-city">${data.name}</p>
        `;
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    });
  } catch (error) {
    console.error("Geolocation error:", error);
  }
}

// Initialize
setBackgroundImage();
getCryptoData();
getWeather();
updateTime();
setInterval(updateTime, 10000);
