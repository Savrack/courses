"use strict";

// посилання на запрос погоди
let url = "https://api.weatherapi.com/v1/forecast.json?key=4edd0fd663ec40d4ba4161714201704";

// створюємо мапу України
let ukraineMap = document.getElementById("ukraineMap");
let ukraineMapDescription = document.getElementById("ukraineMapDescription");
let ukraineMapCityName = document.getElementById("ukraineMapCityName");
let ukraineMapCityEmblem = document.getElementById("ukraineMapCityEmblem");

// показ даних на сторінці
let cityWeather = document.getElementById("cityWeather");
let cityWeatherList = document.getElementById("cityWeatherList");
let cityWeatherContent = document.getElementById("cityWeatherContent");

let featureAvgTemperatureMain = document.getElementById("featureAvgTemperatureMain");
let featureIcon = document.getElementById("featureIcon");
let featureMaxTemperature = document.getElementById("featureMaxTemperature");
let featureMinTemperature = document.getElementById("featureMinTemperature");
let featureAvgTemperature = document.getElementById("featureAvgTemperature");
let featureSpeedWind = document.getElementById("featureSpeedWind");
let featurePrecip = document.getElementById("featurePrecip");
let featureHumidity = document.getElementById("featureHumidity");
let featureSunSet = document.getElementById("featureSunSet");
let featureSunRise = document.getElementById("featureSunRise");

// отримуємо кординати областей України 
let requestUkraineСoordinates = new XMLHttpRequest();
    requestUkraineСoordinates.open("GET", "js/map.json");
    requestUkraineСoordinates.responseType = "json";
    requestUkraineСoordinates.onreadystatechange = function (){
        if(requestUkraineСoordinates.readyState == 4 && requestUkraineСoordinates.status == 200){

            // якщо отримали координати то малюємо карту
            let pathData = requestUkraineСoordinates.response;
                pathData.forEach(element => {
                    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    let region = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    let city = document.createElementNS("http://www.w3.org/2000/svg", "circle");                    

                    // додавання класів для стилізації
                    g.classList.add("map__region-city");
                    region.classList.add("map__region");
                    city.classList.add("map__city");

                    // додавання необхідних атрибутів
                    region.setAttribute("d", element.path);

                    city.setAttributeNS(null, "cx", element.cx);
                    city.setAttributeNS(null, "cy", element.cy);
                    city.setAttributeNS(null, "r", 6);

                    // додаємо елементи на сторіку
                    g.append(region, city);
                    ukraineMap.append(g);

                    // реагування на вибір регіону
                    g.addEventListener("click", function (){   
                        let idRegion = element.idRegion;

                        // змінюємо активний елемент
                        let activeRegion = ukraineMap.querySelector(".map__region-city_active");
                        
                        if(activeRegion != null){
                            activeRegion.classList.remove("map__region-city_active");
                        }

                        ukraineMapDescription.classList.add("map__description_active");

                        // добавлення потрібної ітформації
                        ukraineMapCityName.innerText = element.nameCity;
                        ukraineMapCityEmblem.src = "img/city/" + element.src;
                        
                        g.classList.add("map__region-city_active");

                        // отримання погоди цього регіону
                        let getWeather = new XMLHttpRequest();
                            getWeather.open("GET", url + "&q=" + element.idRegion + "&days=7");
                            getWeather.responseType = "json";
                            getWeather.onreadystatechange = function(){
                                if(getWeather.readyState == 4 && getWeather.status == 200){

                                    // якщо вдалося отримати дані про погоду то
                                    let getWeatherData = getWeather.response;

                                    cityWeatherList.innerHTML = "";
                                    getWeatherData.forecast.forecastday.forEach((element, index) => {
                                        // заповнюємо поле навігації по дням                             
                                        // формуємо дані для заповнення сторінки
                                        let dataDate = element.date.split("-");
                                        let dayText = getWeekDay(new Date(Number(dataDate[0]), Number(dataDate[1]) - 1, Number(dataDate[2])));
                                        
                                        let src = "https:" + element.day.condition.icon;

                                        // формуємо елементи для заповнення 
                                        let li = document.createElement("li");
                                        let day = document.createElement("p");
                                        let date = document.createElement("p");
                                        let img = document.createElement("img");

                                        // добавляємо їм класи
                                        li.classList.add("city-weather-nav__item");
                                        day.classList.add("city-weather-nav__day");
                                        date.classList.add("city-weather-nav__date");
                                        img.classList.add("city-weather-nav__img");

                                        if(index == 0){
                                            li.classList.add("city-weather-nav__item_active");
                                        }

                                        // добавляємо їм необхідної інформації
                                        day.innerText = dayText;
                                        date.innerText = dataDate[2] + "." + dataDate[1] + "." + dataDate[0];
                                        img.src = src;

                                        // добавляємо необхіні атрибути
                                        img.setAttribute("alt", "Дані дані надані сайтом WeatherAPI.com");

                                        // добавляємо їх на сторінку
                                        li.append(day, img, date);
                                        cityWeatherList.append(li);

                                        // заповнюємо поле повної інформації
                                        if(index == 0){
                                            featureAvgTemperatureMain.innerText = element.day.avgtemp_c;
                                            featureIcon.src = src;
                                            featureMaxTemperature.innerText = element.day.maxtemp_c;
                                            featureMinTemperature.innerText = element.day.mintemp_c;
                                            featureAvgTemperature.innerText = element.day.avgtemp_c;
                                            featureSpeedWind.innerText = element.day.maxwind_kph;
                                            featurePrecip.innerText = element.day.totalprecip_mm;
                                            featureHumidity.innerText = element.day.avghumidity;

                                            // час
                                            let sunSet = element.astro.sunset.replace("PM", "").split(":");
                                            let sunRise = element.astro.sunrise.replace("AM", "");

                                            sunSet = `${Number(sunSet[0]) + 12}:${sunSet[1]}`                                        

                                            featureSunSet.innerText = sunSet;
                                            featureSunRise.innerText = sunRise;

                                        }

                                        // реакція на зміну дня
                                        li.addEventListener("click", function (){
                                            cityWeatherList.querySelector(".city-weather-nav__item_active").classList.remove("city-weather-nav__item_active");

                                            featureAvgTemperatureMain.innerText = element.day.avgtemp_c;
                                            featureIcon.src = src;
                                            featureMaxTemperature.innerText = element.day.maxtemp_c;
                                            featureMinTemperature.innerText = element.day.mintemp_c;
                                            featureAvgTemperature.innerText = element.day.avgtemp_c;
                                            featureSpeedWind.innerText = element.day.maxwind_kph;
                                            featurePrecip.innerText = element.day.totalprecip_mm;
                                            featureHumidity.innerText = element.day.avghumidity;

                                            // час
                                            let sunSet = element.astro.sunset.replace("PM", "").split(":");
                                            let sunRise = element.astro.sunrise.replace("AM", "");

                                            sunSet = `${Number(sunSet[0]) + 12}:${sunSet[1]}`                                        

                                            featureSunSet.innerText = sunSet;
                                            featureSunRise.innerText = sunRise;

                                            this.classList.add("city-weather-nav__item_active");
                                        });
                                        
                                    });

                                    


                                    cityWeather.classList.add("city-weather_active");
                                }
                            }
                            getWeather.send();
                    }); 
                });
        }
    }
    requestUkraineСoordinates.send();






// функція для отримання дня тижня
function getWeekDay(date){
    let days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

    return days[date.getDay()];
}
