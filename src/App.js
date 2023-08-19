import { useState } from "react";
import "./App.css";
import Axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState("");

  async function getter(e,res) {
    e.preventDefault();
    const r = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=5b0cf8dc7a67325da249436a01c3caae&units=metric`
    ).then((r) => {
      setData(r.data);
    }).catch((e)=>{
      return res.status(e.response.status).json(e.response.data)
    });
  }

  return (
    <div className="App">
      <h1>Simple Weather API</h1>
      <form onSubmit={getter}>
        <input
          type="text"
          placeholder="Enter Cityname"
          onChange={(e) => {
            setWeather(e.target.value);
          }}
        ></input>
        <p>{setData}</p>
        <button type="submit" className="subx">Submit</button>
      </form>
      {data.main && (
      <div>
        <h2>Weather in {data.name}, {data.sys.country}</h2>
        <p>Temperature: {Math.round(data.main.temp)}°C</p>
        <p>Weather: {data.weather[0].description}</p>
      </div>
    )}
    </div>
  );
}

