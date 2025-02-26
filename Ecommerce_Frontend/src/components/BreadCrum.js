import React from 'react'
import {Link} from "react-router-dom";

const BreadCrum = (props) => {
  const {title} = props;

  return (
    <div className='mb-1 md:mb-3 text-sm md:text-base'>
        <div className="bg-white py-2 md:py-5">
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