import React from 'react'
import './Hero.css'

import arrow_icon from '../assets/arrow.png'
import hero_image from '../assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    
                </div>
                <p>Collections</p>
                <p>for everyone</p>
            </div>
            <div className='hero-latest-btn'>
                <div>Latest collections</div>
                <img src={arrow_icon} alt=""/>
            </div>

        </div>
        <div className='hero-right'>
            <img src={hero_image} alt=""/>
        </div>
      
    </div>
  )
}

export default Hero
