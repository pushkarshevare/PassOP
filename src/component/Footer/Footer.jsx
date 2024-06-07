import React from 'react'
import './style.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="logo">
          <span>&lt;</span>
          Pass
          <span>OP/&gt;</span>
        </div>
          <div className="footer-text">
              Created with  <lord-icon
              src="https://cdn.lordicon.com/jjoolpwc.json"
              trigger="morph"
              stroke="bold"
              state="morph-slider"
              colors="primary:#ffffff,secondary:#ffffff">
          </lord-icon>  by Pushkaraj Shevre
          </div>    
    </div>
  )
}

export default Footer
