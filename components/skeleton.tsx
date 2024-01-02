"use client"
import { useCountryStore } from '@/store/store'
import { country } from '@/types/types';
import React, { useEffect, useState } from 'react'

export default function Skeleton({count}: { count: country[] }) {
    const [countriesSkeleton, setCountriesSkeleton] = useState<number[]>(new Array(11).fill(0))

    useEffect(() => {
        const len = count?.length
        // setCountriesFound(len)
        if (len<11) {
          let arr = new Array(11-len).fill(0)
          setCountriesSkeleton(arr)
        }
      }, [ count])
    
  return (
    <>
    {count.map((i: country, idx: number) => (

        <tr key={idx} className="py-2 flex items-center justify-between w-[100%] text-ptext font-semibold border-none hover:bg-transparent hover:opacity-60 transition-all duration-200 cursor-pointer">
        <td className='text-ptext text-start w-[25%]'><div className="w-[60px] h-[40px] rounded-md bg-[#282B30]"></div></td>
        <td className='text-ptext text-start w-[25%]'><div style={{ width: `${i.name.common.length * 5}px` }} className={`h-5 rounded-xl bg-[#282B30]`}></div></td>
        <td className='text-ptext text-start w-[25%]'><div style={{ width: `${i.population.toString().length * 16}px` }} className=" h-5 rounded-xl bg-[#282B30]"></div></td>
        <td className='text-ptext text-start w-[25%]'><div style={{ width: `${i.area.toString().length * 16}px` }} className=" h-5 rounded-xl bg-[#282B30]"></div></td>
        <td className='text-ptext text-start w-[25%]'><div style={{ width: `${i.region.length * 16}px` }} className=" h-5 rounded-xl bg-[#282B30]"></div></td>
      </tr>
          ) 
    )}
  </>
  )
}
