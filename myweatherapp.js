let apikey = `31093cbead45007362abfe4eca6be821`;
let cname = document.getElementById('name');
let rain = document.getElementById('rain');
let mytemp = document.getElementById('temp2');
let myfeel = document.getElementById('feelslike2');
let myhumi = document.getElementById('humidity2');
let myimg = document.getElementById('myimg');
let mainhourly = document.querySelectorAll('.mainhourly');
let tempdet = document.querySelectorAll('.tempdet');
let flag = document.getElementById('flag');
let timeday = document.getElementById('timeday');
let mydate = document.getElementById('date');
let maininpt = document.getElementById('maininpt');
let inpt, city;
let locerror = document.getElementById('error');
let innererror = document.getElementById('errorcont');
let myndate = document.querySelectorAll('.myndate')
let innernext = document.querySelectorAll('.innernext');
let forecast = document.getElementById('forecast')

async function togettempdet() {  //to get input from user
    inpt = document.getElementById("myinput").value;
    city = inpt;
    if (city == "") { //if input will blank it shows an error
        locerror.style.display = "flex";
        innererror.innerHTML = "*Please enter the city name";
        document.getElementById('myinput').focus();
    }
    else { // if the user enter correct city then this block will execute
        locerror.style.display = "none";
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        let { lat, lon, state, name } = data[0];
        let myurl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
        let response2 = await fetch(myurl2);
        let data2 = await response2.json();
        console.log(data2);

        var { main, id, icon, description } = data2.weather[0];
        var { temp, feels_like, humidity } = data2.main;
        var { timezone, dt } = data2;
        let { country, sunrise } = data2.sys;
        console.log(timezone);
        let date = new Date((dt + timezone) * 1000);
        // let newdate = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear();
        let newutcdate = date.getUTCDate();
        let newutcmonth = date.getUTCMonth()+1;
        let newutcyear = date.getUTCFullYear();
        let hours = date.getUTCHours();
        let min = date.getUTCMinutes();
        let h = hours % 12;
        let newh = h < 10 ? '0' + h : h;
        let ampm
        if (hours >= 0 && hours < 12) {
            ampm = "am";
        }
        else {
            ampm = "pm"
        }
        let newmin = min < 10 ? '0' + min : min;
        timeday.innerHTML = `${newh + ":" + newmin + " " + ampm}`;
        mydate.innerHTML = `${newutcdate + "/" + newutcmonth +"/"+newutcyear}`;
        if (name == "Sahibzada Ajit Singh Nagar") {
            name = "Mohali";
        }
        else if (name == "Nagar") {
            name = "Kufri"
        }
        let flag = document.getElementById('flag');
        flag.src = `https://flagcdn.com/w20/${country.toLowerCase()}.png`;
            myimg.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" srcset="" id = "wimg">`
        if (!state || state == name) {
            state = country;
        }
        cname.innerHTML = `${name}, ${state}`
        let round = Math.round(temp);
        let round2 = Math.round(feels_like);
        mytemp.innerHTML = `${round}°C`;
        myfeel.innerHTML = `${round2}°C`;
        myhumi.innerHTML = `${humidity}`;
        let substr = main.substr(0, 1);
        if (substr.toLowerCase()) {
            main = substr.toUpperCase() + main.substr(1);
        }
        document.getElementById('maintemp').innerHTML = `<span id="temp2">${round}°C</span>`;
        rain.innerHTML = `${description}`;
        disnone();
        forecast(city);
    }
}
function disnone() {
    document.getElementById('spinner').style.display = "flex";
    setTimeout(() => {
        maininpt.style.height = "60rem";
        // maininpt.style.width = "45%";
    /*    maininpt.style.backgroundImage = "url(https://images.unsplash.com/photo-1500390365106-166bb67248d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80)";*/

        document.getElementById('spinner').style.display = "none";
        document.getElementById('abt').style.display = "none";
        document.getElementById('output').style.display = "flex";
        document.getElementById('output').style.alignItems = "center";
        document.getElementById('output').style.justifyContent = "center";
        document.getElementById('output').style.flexDirection = "column";
        document.getElementById('output').style.flexWrap = "wrap";

        document.getElementById('myback').style.display = "flex";
    },700);
    document.getElementById('spinner2').style.display = "flex";
    setTimeout(() => {
        document.getElementById('spinner2').style.display = "none";
        document.getElementById('forecast').style.display = "flex";
        /*document.getElementById('forecast').style.marginTop = "-9%";
        document.getElementById('forecast').style.marginLeft = "32%";*/
        // document.getElementById('forecast').style.backgroundColor = "rgb(37, 30, 30)";
        // document.getElementById('forecast').style.borderRadius= "5px";
        // document.getElementById('abtforc').style.display= "flex";


    }, 1500);
}
let myipt = document.getElementById("myinput");
myipt.addEventListener("keyup", func3 = () => {
    if (event.keyCode == "13") {
        togettempdet();
    }
});
mylocfun = () => { //current location
    error.style.display = "none";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(show, showerror);
    }
    function showerror(error) {
        if (error.code == error.PERMISSION_DENIED) {
            locerror.style.display = "flex";
            innererror.innerHTML = "*Please turn on your location!";
        }
        if (error.code == error.POSITION_UNAVAILABLE) {
            locerror.style.display = "flex";
            innererror.innerHTML = "*Location information is unavailable!";
        }
    }
    async function show(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url3 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
        let response = await fetch(url3);
        let data = await response.json();
        console.log(data)
        let { temp, humidity, feels_like } = data.main;
        var { main, id, icon, description } = data.weather[0];
        let { country } = data.sys;
        let { name, timezone, dt } = data;
        let flag = document.getElementById('flag');
        flag.src = `https://flagcdn.com/w20/${country.toLowerCase()}.png`;

        if (name == "Sahibzada Ajit Singh Nagar") {
            name = "Mohali";
        }
        else if (name == "Nagar") {
            name = "Kufri"
        }
        console.log(temp);
        let round = Math.round(temp)
        let round2 = Math.round(temp)
        mytemp.innerHTML = round + "°C";
        myfeel.innerHTML = round2 + "°C";
        myhumi.innerHTML = humidity;
        cname.innerHTML = `${name + ", " + country}`;
        document.getElementById('maintemp').innerHTML = `<span id="temp2">${round}°C</span>`;
        rain.innerHTML = `${description}`;
        let i = 1;
        let date = new Date((dt + timezone) * 1000);
        // let newdate = date.getUTCDate() + "/" + date.getUTCMonth()+`${++i}` + "/" + date.getUTCFullYear();
       let newutcdate = date.getUTCDate();
       let newutcmonth = date.getUTCMonth()+1;
       let newutcyear = date.getUTCFullYear();

        let hours = date.getUTCHours();
        let min = date.getUTCMinutes();
        let h = hours % 12;
        let newh = h < 10 ? '0' + h : h;
        let ampm
        if (hours >= 0 && hours < 12) {
            ampm = "am";
        }
        else {
            ampm = "pm"
        }
        console.log(date.getUTCMonth()+1);
        let newmin = min < 10 ? '0' + min : min;
        timeday.innerHTML = `${newh + ":" + newmin + " " + ampm}`;
        mydate.innerHTML = `${newutcdate + "/" + newutcmonth +"/"+newutcyear}`;
            myimg.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="icon" srcset="" id = "wimg">`
        forecast2(longitude, latitude);
        disnone();
    }
}
backfunc = () => {
    maininpt.style.height = "60rem";
    locerror.style.display = "none";
    document.getElementById('forecast').style.display = "none";
    document.getElementById('output').style.display = "none";
    document.getElementById('abt').style.display = "block";
    document.getElementById('myback').style.display = "none";
    document.getElementById('myinput').value = "";
    maininpt.style.backgroundImage = "url(https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)";
}
forecast = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`).then(a => a.json()).then(b => day(b))
    function day(b) {
        let t = b.city.timezone;
        let i = 0;
        while (i < 5) {
            for (let j = 0; j < b.list.length; j += 8) {
                let d = b.list[j].dt;
                let icon = b.list[j].weather[0].icon;
                let date = new Date((d + t) * 1000);
                let mdate = date.getUTCDate();
                // let month = date.getUTCMonth();
                let montharr = ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                let newd = montharr[date.getUTCMonth()]
                myndate[i].innerHTML = `${mdate + " " + newd}`;
                    innernext[i].innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" srcset="" id = "wimg2">`
                i++;
            }
        }
    }
    day();
}
function forecast2(longitude, latitude) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`).then(
        a => a.json()).then(b => locationfetch(b))
    function locationfetch(b) {
        console.log(b)
        let t = b.city.timezone;
        let i = 0;
        while (i < 5) {
            for (let j = 0; j < b.list.length; j += 8) {
                let d = b.list[j].dt;
                let icon = b.list[j].weather[0].icon;
                let date = new Date((d + t) * 1000);
                let mdate = date.getUTCDate();
                // let month = date.getUTCMonth();
                let montharr = ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                let newd = montharr[date.getUTCMonth()];
                myndate[i].innerHTML = `${mdate + " " + newd}`;
                    innernext[i].innerHTML = `<img src=" https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" srcset="" id = "wimg2">`
                    i++;
                
                }
            }
        }
    }
