import React from 'react';
import image from '../assets/logo.png'    


class Logo extends React.Component {
  render() {

    return(
        <div className='logo-container'>
        <img src={image}alt='logo' width={50} height={50} className='logoImage'/>
         <h2 className='logo-text'>EUS</h2>
         </div>
    )
  }
}

export default Logo;
