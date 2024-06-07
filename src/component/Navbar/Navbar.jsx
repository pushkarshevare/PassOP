import React from 'react'
import './style.css'

const Navbar = () => {
  return (
    <div>
        <nav className='navbar'>
          <div className="logo">
          <span>&lt;</span>
          Pass
          <span>OP/&gt;</span>
          </div>
          {/* <ul>
            <li>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Contact</a>
            </li>
          </ul> */}
          <button>
            <img src='/icons/github.png' />
            <span>GitHub</span>
          </button>
        </nav>
    </div>
  )
}

export default Navbar
