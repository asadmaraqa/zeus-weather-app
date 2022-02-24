import React from 'react';
import { Card } from 'react-bootstrap';


class CityCurrentWeather extends React.Component {
  render() {
    const weather = this.props.weather;
    const temp = weather.Temperature.Metric.Value;
    const weatherText= weather.WeatherText;
    const icon = weather.WeatherIcon < 10 ? '0' + weather.WeatherIcon : weather.WeatherIcon;
    const date = new Date(weather.EpochTime * 1000);
    const currentDate = date.getDate() + '/' + (date.getMonth() + 1);
    return(
      <div className="info-container">
        <div className='date'>{currentDate}</div>
       <div className="top"> <p>{this.props.city}</p></div>
       <div className='bold'> <p className='temp'>{temp} °C</p></div>
        <h2 className="description">{weatherText}</h2>
        <img src={"https://developer.accuweather.com/sites/default/files/" + icon + "-s.png"} alt="Current weather icon" 
        className="icon"/>
      </div>
    )
  }
}

export default CityCurrentWeather;
