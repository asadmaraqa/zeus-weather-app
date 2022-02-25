import React from 'react';


class CitySearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);

  }

  handleCityChange(e) {
    this.props.onCitySearch(e.target.value);
  }

  handleCitySearch(e) {
    e.preventDefault();
    this.props.onCitySearchSubmit(this.refs.description.value);
  }

  render() {
    return(
      <div className='searchBoox-container'>
   
    <form onSubmit={this.handleCitySearch} className="search" action="/"name="searchbar" netlify netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="contact" />

        <input
          type="text"
          name="search"
          placeholder="Type name of a city here"
          ref="description"
          value={this.props.search}
          onChange={this.handleCityChange}
          className="search" />
        <button type="submit" className='myButton'>Ask Zeus ccc</button>
      </form>
      </div>
    );
  }
}

export default CitySearchBar;
