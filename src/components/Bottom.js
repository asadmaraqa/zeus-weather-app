import React from 'react';



class Bottom extends React.Component {
  render() {
    const forecast = this.props.forecast;
    const headline= forecast.DailyForecasts[0].Day.IconPhrase;
    const MaxWeather= forecast.DailyForecasts[0].Temperature.Maximum.Value;
    const MinWeather= forecast.DailyForecasts[0].Temperature.Minimum.Value;
   
    return (
        
        <div className='bottom'>
          <div><p className='bold'>Today will be like</p></div>
        <div><p>{headline}</p></div>
        <div className='forecastMax-Min-Container'><p>-Maximum temperature:</p> {MaxWeather} °C</div>
        <div className='forecastMax-Min-Container'><p>-Minimum temperature:</p> {MinWeather} °C</div>
        </div>
    )
  }
}

export default Bottom;
