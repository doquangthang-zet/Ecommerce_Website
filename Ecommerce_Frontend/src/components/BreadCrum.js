import React from 'react'
import {Link} from "react-router-dom";

const BreadCrum = (props) => {
  const {title} = props;

  return (
    <div className='mb-3'>
        <div className="bg-white py-5">
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