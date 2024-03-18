import React from 'react'

const AddColor = () => {
  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">Add Color</h3>

        <div>
            <form action="">
              <div class="relative mt-4 mb-4">
                <input type="text" id="title" class="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" " />
                <label htmlFor="title" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter color</label>
              </div>

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>Add color</button>
            </form>
        </div>
    </div>
  )
}

export default AddColor