"use client"
import React, { ComponentPropsWithRef, Suspense, useEffect } from 'react'
import Image from 'next/image'
import { cn, convertToCommaSeperated } from '@/lib/utils'
import { useMount } from '@/lib/mount'
import { country } from '@/types/types'
import { useCountryStore } from '@/store/store'
import Skeleton from './skeleton'
import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
  
type worldTableProps = {
}

export default function WorldTable({}: worldTableProps) {

  const {mount } = useMount();
  const setCountries = useCountryStore((state) => state.setCountries)
  const data = useCountryStore((state) => state.countries)
  const sortValue = useCountryStore((state) => state.sortValue)
  const regions = useCountryStore((state) => state.region)
  const search = useCountryStore((state) => state.search);
  const independent = useCountryStore((state) => state.isFree) as boolean;
  const unMember = useCountryStore((state) => state.unMember) as boolean;

  const router = useRouter();
  useEffect(() => {
    const worldData = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/${independent ? 'independent?status=true' : 'all?fields=region,name,flags,population,area,cca3,unMember'}`);
      const data = await res.json();
      setCountries(data);
    }

    worldData();
  },[independent])

  const countriesToShow = data?.sort((a: country, b: country) => sortValue === 'name' ? a.name.common.localeCompare(b.name.common) : b[sortValue] - a[sortValue])
  .filter((country: country) => unMember ? country.unMember === true : true )
  .filter((country: country) => regions.length > 0 ? regions.includes(country.region) : true)
  .filter((country: country) => search ? country.name.common.toLowerCase().includes(search) : true)


  if(!mount) return null;

  return (  
    <div className='w-full max-h-[720px] scrollbar overflow-y-scroll relative '>

    <table className='w-full p-2'>
     
    <tbody className='flex flex-col items-center justify-between w-full bg-pbg'>
    <tr className={cn('flex items-center justify-between w-full mt-0  sticky top-0 left-0 right-0 z-20 bg-pbg py-4 border-b-2 border-b-sbg')}>
        <td className='text-stext font-semibold text-start sm:w-[20%] w-[50%]'>Flag</td>
        <td className='text-stext font-semibold text-start sm:w-[20%] w-[50%]'>Name</td>
        <td className='text-stext font-semibold text-start hidden sm:block w-[20%]'>Population</td>
        <td className='text-stext font-semibold text-start hidden sm:block w-[20%]'>Area(km<sup>2</sup>)</td>
        <td className='text-stext font-semibold text-start hidden sm:block w-[20%]'>Region</td>
      </tr>
          <Suspense fallback={<Skeleton count={countriesToShow} />}>
          {
            countriesToShow.map((item: country, index: number) => (
              <tr 
                key={index} 
                onClick={() => router.push(`/${item.name.common}`)}
                className={
                cn(
                  'py-2 flex items-center justify-between w-full text-ptext font-semibold border-none hover:bg-transparent hover:opacity-60 transition-all duration-200 cursor-pointer'
                  )}>
                  <td className='text-ptext text-start sm:w-[20%] w-[50%]'  >    
                    <Image className='rounded-md object-cover w-[60px] h-[40px]' src={item?.flags?.png} alt={item?.name?.common as string} width={100} height={100} />
                  </td> 
                  <td className='text-ptext text-start sm:w-[20%] w-[50%]' >{item?.name?.common}</td> 
                  <td className='text-ptext text-start  hidden sm:block w-[20%]' >{convertToCommaSeperated(item?.population)}</td> 
                  <td className='text-ptext text-start  hidden sm:block w-[20%]' >{convertToCommaSeperated(item?.area)}</td> 
                  <td className='text-ptext text-start  hidden sm:block w-[20%]' >{item?.region}</td> 
              </tr>         
            ))
          }
          </Suspense>
          {/* <Skeleton count={countriesToShow} /> */}
    </tbody>
    </table>
    </div>

  )
}
