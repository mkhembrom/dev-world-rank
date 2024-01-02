import React from 'react'
import SearchInput from './searchInput'

export default function Navbar() {
  return (
    <div className='w-full flex justify-between item-center py-2'>
        <p className='text-lg text-stext font-bold'>Found {234} countries</p>
        <SearchInput />
    </div>
  )
}
