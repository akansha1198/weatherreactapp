import React, { useState } from 'react';

const api = 
{
  key: "e87bce52bcf0a00c4f98a55e44b6f5f7",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() 
{
const[query,setQuery] = useState('');
const[weather,setWeather] = useState({});

//fetch get request for fetching the weather data from the api base
const search = evt => {
  if(evt.key === "Enter") {
    fetch(   `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`    )
    .then(res => res.json())             //result promise.
    .then(result => {
      setWeather(result);
     setQuery('');
     console.log(result);
  });
}
}



  const dateBuilder= (d) => {
    let months = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Sun", "Mon","Tue","Wed","Thur","Fri","Sat"];


    let day = days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    
    <div className="app">
     <main>
       
       <div className="search-box">
         <input
         type="text"
         className="search-bar"
         placeholder="Search..."
         onChange={e => setQuery(e.target.value)}
         value={query}
         onKeyPress={search}
         />
           
       </div>
       {(typeof weather.main != "undefined") ? (
         <div>
         <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div> 
        </div>
        
        <div className="weather-box">
          <div className="temp"> {Math.round(weather.main.temp)}°C </div>
          <div className="weather">{weather.weather[0].main}</div> 
        </div>
      </div>
       ) :  ('')}
     </main>
    </div>
  );
}

export default App;
