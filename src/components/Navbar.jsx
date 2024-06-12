import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2'>
    <div className="logo">
      <span className='text-x1 mx-9 cursor-pointer hover:font-bold transition-all duration-100'>iTask</span>
    </div>
     <ul className='flex gap-8 mx-9'>
    <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
    <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
     </ul> 
    </nav>
  )
}

export default Navbar
