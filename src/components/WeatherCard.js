import React from 'react';
import CurrentWeather from './CurrentWeather';


class WeatherCard extends React.Component {
  render() {
    return (
      <div>
        <CurrentWeather
          currentTemp={this.props.currentTemp}
          city={this.props.city}
          weather={this.props.weather} />
      </div>
    )
  }
}

export default WeatherCard;
