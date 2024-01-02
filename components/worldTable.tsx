"use client"
import React, { ComponentPropsWithRef, Suspense, useEffect } from 'react'
import Image from 'next/image'
import { cn, convertToCommaSeperated } from '@/lib/utils'
import { useMount } from '@/lib/mount'
import { country } from '@/types/types'
import { useCountryStore } from '@/store/store'
import Skeleton from './skeleton'
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
      const res = await fetch(`https://restcountries.com/v3.1/${independent ? 'independent?status=true' : 'all?fields=currencies,region,continents,subregion,languages,name,flags,population,area,cca3,unMember,capital,continent,borders'}`);
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
    <div className='w-full max-h-[720px] scrollbar overflow-y-scroll overflow-x-hidden relative lg:pl-10 lg:pr-4'>

     
    <div className='flex flex-col items-center justify-between w-full bg-pbg '>
        <div className={cn('grid grid-cols-5 mt-0 w-full  sticky top-0 left-0 z-20 bg-pbg py-4 border-b-2 border-b-sbg')}>
            <div className='col-span-1 text-stext font-semibold text-start sm:w-[10%] w-[50%]'>Flag</div>
            <div className='col-span-1 text-stext font-semibold text-start sm:w-full w-[50%]'>Name</div>
            <div className='col-span-1 text-stext font-semibold text-start hidden sm:block w-[20%]'>Population</div>
            <div className='col-span-1 text-stext font-semibold text-start hidden sm:block w-[10%]'>Area(km<sup>2</sup>)</div>
            <div className='col-span-1 text-stext font-semibold text-start hidden sm:block w-[10%]'>Region</div>
          </div>
          {
            countriesToShow.map((item: country, index: number) => (
              <div 
                key={index} 
                onClick={() => router.push(`/${item.name.common}`)}
                className={
                cn(
                  'py-2  grid grid-cols-5 w-full text-ptext font-semibold border-none hover:bg-transparent hover:opacity-60 transition-all duration-200 cursor-pointer'
                  )}>
                  <div className='text-ptext text-start sm:w-full w-[50%]'  >    
                    <Image className='rounded-md object-cover w-[60px] h-[40px]' src={item?.flags?.png} alt={item?.name?.common as string} width={100} height={100} />
                  </div> 
                  <div className='col-span-1 text-ptext text-start sm:w-full w-[50%]' >{item?.name?.common}</div> 
                  <div className='col-span-1 text-ptext text-start  hidden sm:block w-[20%]' >{convertToCommaSeperated(item?.population)}</div> 
                  <div className='col-span-1 text-ptext text-start  hidden sm:block w-[10%]' >{convertToCommaSeperated(item?.area)}</div> 
                  <div className='col-span-1 text-ptext text-start  hidden sm:block w-[10%]' >{item?.region}</div> 
              </div>         
            ))
          }

    </div>
    </div>

  )
}
