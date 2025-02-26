import React, { useEffect } from 'react'
import { getAllColor } from '../features/color/colorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Color = (props) => {
  const dispatch = useDispatch();
  const colorState = useSelector(state => state?.color?.colors);
  const {colorData, setColor} = props;
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    dispatch(getAllColor());
  }, []);

  return (
    <>
        <ul className='list-none flex flex-wrap gap-4'>
          {
            colorData && colorData?.map((item, index) => (
              <li 
                key={index} 
                onClick={() => {
                  setColor(item?._id);
                  setSelectedColor(item?._id);
                }} 
                style={{backgroundColor: item?.title}} 
                className={`w-5 h-5 rounded-full border border-gray-600 cursor-pointer transition-all duration-300 ${selectedColor === item?._id ? "ring-4 ring-cyan-600 scale-130" : ""}`}
              ></li>
            ))
          }
        </ul>
    </>
  )
}

export default Color