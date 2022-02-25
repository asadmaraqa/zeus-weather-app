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
      <form onSubmit={this.handleCitySearch} className="search">
        <input
          type="text"
          placeholder="Type name of a city here"
          ref="description"
          value={this.props.search}
          onChange={this.handleCityChange}
          className="search" />
        <button type="submit" className='myButton'>Ask Zeus</button>
      </form>
      </div>
    );
  }
}

export default CitySearchBar;
