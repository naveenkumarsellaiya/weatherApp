const apikey = 'ceb760c52e26d1be84ea6f1eb6be7133';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function weatherAPI(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);

        // Log the icon code to verify it's correct
        console.log("Icon code:", data.weather[0].icon);

        // Correctly set the weather icon URL
        document.querySelector(".weathericon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector(".temp").textContent = `${data.main.temp}°C`;
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
    } catch (error) {
        console.error(error);
        alert("City not found or an error occurred.");
    }
}

document.querySelector("button").addEventListener("click", () => {
    const city = document.querySelector("#cityName").value;
    if (city) {
        weatherAPI(city);
    } else {
        alert("Please enter a city name.");
    }
});
