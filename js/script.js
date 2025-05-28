let city_name1;

let search = document.querySelector("#search")

let city = document.querySelector("#search")
city.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        city_name1 = city.value
        main()
    }
})

let body = document.querySelector(".main-box")


//-----------FETCHING DATA FROM API------------
async function getData() {

    let key = `e09d39c12ad5110f055c02b099b58ad7`
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name1}&units=metric&appid=${key}`)
    const responce = await data.json()
    return responce
}


//-----------MAIN FUNCTION------------
async function main() {


//-----------GETTING DATA FROM API ------------
    let ans = await getData()
    console.log(ans)

//------------CHECKING FOR VALID CITY NAME---------
if (ans.cod == "404") {
    alert("Enter a valid city name")
}


//-----------SETTING CUSTOM VARIABLE FOR FURTHUR USE------------
    let name = ans.name
    let temp = ans.main.temp
    let humidity = ans.main.humidity
    let wind = ans.wind.speed
    let feel = ans.main.feels_like
    let description = ans.weather[0].description.toLowerCase()
    let sunrise = ans.sys.sunrise
    let sunset = ans.sys.sunset
    let timezone = ans.timezone
    let current_time = ans.dt
    let img;
    let hours1;


//----------GETTING TIME OF THE LOCATION-----------
    let time = new Date((current_time + timezone) * 1000);
    let hours = time.getUTCHours().toString().padStart(2, '0')
    let minutes = time.getUTCMinutes().toString().padStart(2, '0')
    let time24hrs = `${hours}:${minutes}`
    let day = time.getUTCDate().toString().padStart(2, '0')
    let month = time.getUTCMonth().toString().padStart(2, '0')
    let monthP = Number.parseInt(month) + 1
    let year = time.getUTCFullYear().toString().padStart(2, '0')


//--------------SETTING IMAGE BASED ON WEATHER DESCRIPTION-----------
    function check() {
        hours1 = Number.parseInt(hours)
        //----------CLEAR SKY----------------
        if ((description == "clear sky") && ((hours1 >= 0 && hours1 < 6) || (hours1 >= 19 && hours1 < 24))) {
            img = `svgs/moon.svg`
        }
        else if ((description == "clear sky") && ((hours1 >= 6 && hours1 < 19))) {
            img = `svgs/sun.svg`
        }
        //-----------CLOUDS-------------
        else if ((description == "few clouds" || description == "scattered clouds" || description == "broken clouds") && ((hours1 >= 0 && hours1 < 6) || (hours1 >= 19 && hours1 < 24))) {
            img = `svgs/moon_cloud.svg`
        }
        else if ((description == "few clouds" || description == "scattered clouds" || description == "broken clouds") && ((hours1 >= 6 && hours1 < 19))) {
            img = `svgs/sun_cloud.svg`
        }
        else if ((description == "overcast clouds")) {
            img = `svgs/clouds.svg`
        }
        //---------DRIZZLE---------------
        else if ((description == "light intensity drizzle" || description == "drizzle" || description == "heavy intensity drizzle") && ((hours1 >= 0 && hours1 < 6) || (hours1 >= 19 && hours1 < 24))) {
            img = `svgs/drizzle_night.svg`
        }
        else if ((description == "light intensity drizzle" || description == "drizzle" || description == "heavy intensity drizzle") && ((hours1 >= 6 && hours1 < 19))) {
            img = `svgs/drizzle_day.svg`
        }
        //--------RAIN------------------
        else if ((description == "light rain" || description == "moderate rain" || description == "heavy intensity rain" || description == "very heavy rain" || description == "extreme rain" || description == "freezing rain")) {
            img = `svgs/rain.svg`
        }
        //--------THUNDERSTORM------------------
        else if ((description == "thunderstorm with light rain" || description == "thunderstorm with heavy rain" || description == "light thunderstorm" || description == "heavy thunderstorm") && ((hours1 >= 0 && hours1 < 6) || (hours1 >= 19 && hours1 < 24))) {
            img = `svgs/thunder_night.svg`
        }
        else if ((description == "thunderstorm with light rain" || description == "thunderstorm with heavy rain" || description == "light thunderstorm" || description == "heavy thunderstorm") && ((hours1 >= 6 && hours1 < 19))) {
            img = `svgs/day.svg`
        }
        //--------SNOW------------------
        else if ((description == "light snow" || description == "snow" || description == "heavy snow" || description == "sleet" || description == "light shower snow")) {
            img = `svgs/snow.svg`
        }
        //--------ATMOSPHERE------------------
        else if ((description == "mist" || description == "smoke" || description == "haze" || description == "fog" || description == "sand/dust whirls") && ((hours1 >= 0 && hours1 < 6) || (hours1 >= 19 && hours1 < 24))) {
            img = `svgs/haze_night.svg`
        }
        else if ((description == "mist" || description == "smoke" || description == "haze" || description == "fog" || description == "sand/dust whirls") && ((hours1 >= 6 && hours1 < 19))) {
            img = `svgs/haze_day.svg`
        }
    }

    check()

//-----------SETTING BODY HTML USING JS--------------
    body.innerHTML = `<div class="time_name">
                <div class="cloud"><img src= ${img} alt=""></div>
                <div class="time">
                    <div class="time_main">${time24hrs}</div>
                    <div class="date">
                        <h3>${day}/${monthP}/${year}</h3>
                        <h4>DD/MM/YY</h4>
                    </div>
                </div>
            </div>

            <div class="weather">
                <div class="city"><span id="city-name">${name}</span></div>

                <div class="temp_days">
                    <div class="upper">

                        <div class="temperature">
                            <span>
                                <div class="tt">${temp}°C</div>
                                <div class="cc">Temperature</div>
                            </span>
                    </div>

                        <div class="feel">
                            <span>
                                <div class="degree">${feel}°C</div>
                                <div class="like">feels like</div></div>
                            </span>

                    </div>

                    <div class="lower">
                        <div class="humidity">

                            <div class="hum">
                                <h3>${humidity}</h3>
                                <h3>Humidity</h3>
                            </div>
                            
                            <div class="wind">
                                <h3>${wind} mph</h3>
                                <h3>Wind</h3>
                            </div>

                            <div class="discription">
                                <h3>${description}</h3>
                            </div>

                        </div>
                    </div>


                </div>

            </div>`

}


main()

let magni = document.querySelector(".nav-right img")
magni.addEventListener("click", ()=>{
    city_name1 = city.value;
    main()
})
