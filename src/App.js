import React from 'react';
import './App.css';
import CitySearchBar from './components/CitySearchBar';
import CityWeatherCard from './components/CityWeatherCard';
import Logo from './components/logo';

const axios = require('axios');

class CityWeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      city: '',
      error: null,
      locationKey: '',
      currentWeather: [],
      firstSearch: false,
      locationLoaded: false,
      currentLoaded: false,
      forecastLoaded: false,
      
    };

    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleCitySearchSubmit = this.handleCitySearchSubmit.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  getWeather() {
    axios.get('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=R8xO5ZrGwWjcdB8yuUqFzrlTrq8qbT81&q=' + escape(this.state.search)
      )
      .then(
        (response) => {
          const state = response.data[0].AdministrativeArea.LocalizedType === "State" ? response.data[0].AdministrativeArea.ID + ' ' : '';
          const country = response.data[0].AdministrativeArea.CountryID;
          this.setState({
            city: response.data[0].LocalizedName + ', ' + state + country,
            locationKey: response.data[0].Key,
            locationLoaded: true,
            firstSearch: true
          });

        axios.get('http://dataservice.accuweather.com/currentconditions/v1/' + this.state.locationKey + '?apikey=R8xO5ZrGwWjcdB8yuUqFzrlTrq8qbT81'
        )
        .then((response) => {
          console.log(response.data[0]);
          this.setState({
            currentWeather: response.data[0],
            currentLoaded: true
          });
        })
        .catch((error) => {
          this.setState({
            error: error
          });
        });

      })

  }

  handleCitySearch(search) {
    this.setState({
      search: search
    });
  }

  handleCitySearchSubmit(search) {
    this.setState({
      search: '',
      error: null
    });
    this.getWeather();
  }

  handleError() {
    this.setState({error: null});
  }

  render() {
    const { error, firstSearch, locationLoaded, currentLoaded, city, search  } = this.state;
    if (error) {
      return (
        <div>
          <CitySearchBar
            search={search}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} />
          <h3>Sorry, Zeus thinks there is an error!</h3>
        </div>
      )
    } else if (!firstSearch) {
      return (
        <div className="app">
          <div>
          <Logo />
          <div className='welcomeMessage'>
          <div> <CitySearchBar
            search={search}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} /></div>
            <div className='welcomeMessage2'><h3>Let Zeus work to find you the weather.</h3></div>
            </div>
            </div>
        </div>
      )
    } else if (!locationLoaded || !currentLoaded) {
      return (
        <div>
          <h3>Zeusing...</h3>
        </div>
      )
    } else {
        return (
        <div className="app">
          <h1 className='logo-text'>ZEUS</h1>
          <CitySearchBar
            search={search}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} />

          <CityWeatherCard
            city={city}
            weather={this.state.currentWeather} />
         
            
        </div>
        )
    }
  }
}

export default CityWeatherForecast;
