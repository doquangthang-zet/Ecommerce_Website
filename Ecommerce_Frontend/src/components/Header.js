import React from 'react'
import {NavLink, Link} from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header-top-strip">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p>Free shipping</p>
            </div>
            <div className="col-6">
              <p className='text-end'>
                Hotline: <a href="tel:+849842889">+849842889</a>
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header