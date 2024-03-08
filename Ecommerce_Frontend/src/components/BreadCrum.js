import React from 'react'
import {NavLink, Link} from "react-router-dom";

const BreadCrum = (props) => {
  const {title} = props;

  return (
    <div className='py-4'>
        <div className="container mx-auto">
            <div className="grid">
              <div className="col-span-1">
                <p className='text-center'>
                  <Link to="/">Home &nbsp;</Link> / &nbsp;{title}
                </p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default BreadCrum