import React from 'react';
import './App.css';
import CitySearchBar from './components/CitySearchBar';
import CityWeatherCard from './components/CityWeatherCard';
import Logo from './components/logo';
import Footer from "./components/Footer"
import API_KEY from "./apiKey"
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
      weatherForecast:[],
      firstSearch: false,
      locationLoaded: false,
      currentLoaded: false,
      forecastLoaded:false
      
    };

    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleCitySearchSubmit = this.handleCitySearchSubmit.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  getWeather() {
    axios.get('https://dataservice.accuweather.com/locations/v1/cities/search?apikey='  + API_KEY + '&q=' + escape(this.state.search)
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

        axios.get('https://dataservice.accuweather.com/currentconditions/v1/' + this.state.locationKey + '?apikey=' + API_KEY
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
        axios.get('https://dataservice.accuweather.com/forecasts/v1/daily/1day/' + this.state.locationKey+ '?apikey=' + API_KEY
        )
        .then((response) => {
          console.log(response.data);
          this.setState({
            weatherForecast: response.data,
            forecastLoaded: true
          });
        })
        .catch((error) => {
          this.setState({
            error: error
          });
        });

      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
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
    const { firstSearch, locationLoaded, currentLoaded,forecastLoaded, city, search  } = this.state;
if (!firstSearch) {
      return (
        <div className="app">
          <div className='searchBox-container' >
          <Logo />
          <div className='welcomeMessage' style={{height: "100%", position: "fixed"}}>
            <div> 
                <CitySearchBar
                search={search}
                onCitySearchSubmit={this.handleCitySearchSubmit}
                onCitySearch={this.handleCitySearch} />
                <h3>Let Zeus work to find you the weather.</h3></div>
              </div>
            </div>
        </div>
      )
    } else if (!locationLoaded || !currentLoaded||!forecastLoaded) {
      return (
        <div>
          <h3>Zeusing...</h3>
        </div>
      )
    } else {
        return (
        <div className="app">
            <div className='searchBox-container'>
          <Logo />
          <div className='welcomeMessage'>
            <div> 
          <CitySearchBar
            search={search}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} />
         </div>
        </div>
          <div>
            <CityWeatherCard
              city={city}
              weather={this.state.currentWeather} />
            </div>
            <Footer forecast={this.state.weatherForecast}/>
        </div>
        
        </div>
        )
    }
  }
}

export default CityWeatherForecast;
