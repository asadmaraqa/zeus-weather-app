import React from 'react';
import { Card } from 'react-bootstrap';
import CityCurrentWeather from './CityCurrentWeather';


class CityWeatherCard extends React.Component {
  render() {
    return (
      <div>
        <CityCurrentWeather
          currentTemp={this.props.currentTemp}
          city={this.props.city}
          weather={this.props.weather} />
      </div>
    )
  }
}

export default CityWeatherCard;
