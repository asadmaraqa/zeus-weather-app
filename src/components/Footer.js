import React from 'react';



class Footer extends React.Component {
  render() {
    const forecast = this.props.forecast;
    const headline= forecast.Headline.Text;
    return (
        <div className='bottom'>{headline}</div>
    )
  }
}

export default Footer;
