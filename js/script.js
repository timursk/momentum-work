//Часы и календарь
const time = document.querySelector('.time');
const timeDate = document.querySelector('.date');


function showTime() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric'};
    
    let currentTime = date.toLocaleTimeString();
    let currentDate = date.toLocaleDateString('en-US', options);
    
    time.textContent = `${currentTime}`;
    timeDate.textContent = `${currentDate}`;
    setTimeout(() => showTime(), 1000);
}
showTime();


//Приветствие 

const greeting = document.querySelector('.greeting');
const GREETING_TEXT = ['Good morning,',  'Good afternoon,', 'Good evening,', 'Good night,'];

function getTimeOfDay() {
    const date = new Date();
    let hours = date.getHours();

    if (hours >= 0 && hours <6) return GREETING_TEXT[3];
    if (hours >= 6 && hours <12) return GREETING_TEXT[0];
    if (hours >= 12 && hours <18) return GREETING_TEXT[1];
    if (hours >= 18 && hours <= 23) return GREETING_TEXT[2];
}

function showGreeting() {
    let rez = getTimeOfDay();
    greeting.textContent = `${rez}`;
    setTimeout(() => showGreeting(), 1000);
}
showGreeting();

const enterName = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', enterName.value);
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        enterName.value = localStorage.getItem('name');
    }
}


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

//Слайдер изображений 
const body = document.querySelector('body');
const PART_OF_DAY = ['morning', 'afternoon', 'evening', 'night'];

function randomSlide(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function getPartOfTheDay(time) {
    if (time >= 0 && time < 6) return PART_OF_DAY[3];
    if (time >= 6 && time < 12) return PART_OF_DAY[0];
    if (time >= 12 && time < 18) return PART_OF_DAY[1];
    if (time >= 18 && time <= 23) return PART_OF_DAY[2];
}
let bgNum = 0;

function setBgLink() {
    let date = new Date();
    let timeOfDay = date.getHours();
    bgNum = randomSlide(1,20) + '';
    bgNum = bgNum.padStart(2, '0');
    let bgDay = getPartOfTheDay(timeOfDay);
    setBg(bgNum, bgDay);
}

function getAllHours() {
    let date = new Date();
    return date.getHours();
}

function setBg(num, day) {
    let img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${day}/${num}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${day}/${num}.jpg')`;
    }
}

setBgLink();

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

function getSlidePrev() {
    +bgNum--;
    bgNum = bgNum < 1 ? 20 : bgNum;
    bgNum = bgNum.toString().padStart(2, '0');
    let hour = getAllHours();
    setBg(bgNum, getPartOfTheDay(hour));
}

function getSlideNext() {
    +bgNum++;
    bgNum = bgNum > 20 ? 01 : bgNum;
    bgNum = bgNum.toString().padStart(2, '0');
    let hour = getAllHours();
    setBg(bgNum, getPartOfTheDay(hour));
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// Погода 
//c840c67c6449d61a329f429a37506f41 API KEY 
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');


if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
}

async function getWeather() {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';    
    weatherError.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c840c67c6449d61a329f429a37506f41&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if (data.cod == 404 || data.cod == 400) {
        weatherError.textContent = `Error! ${data.message} for "${city.value}"`;
    } else {
        let temp = Math.round(data.main.temp);
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${temp}°C`;
        weatherDescription.textContent = `${data.weather[0].description}`;    
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
}

getWeather();
city.addEventListener('change', getWeather);

//Цитата дня

