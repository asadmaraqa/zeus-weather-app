import React from 'react';


class CurrentWeather extends React.Component {
  render() {
    const weather = this.props.weather;
    const temp = weather.Temperature.Metric.Value;
    const weatherText= weather.WeatherText;
    const date = new Date(weather.EpochTime * 1000);
    const currentDate = date.getDate() + '/' + (date.getMonth() + 1);
    return(
      <div className="info-container">
        <div className='date'>{currentDate}</div>
       <div className="top"> <p>Right now in {this.props.city}</p></div>
       <div className='bold'> <p className='temp'>{temp} °C </p></div>
        <h2 className="description">{weatherText}</h2>

      </div>
    )
  }
}

export default CurrentWeather;
