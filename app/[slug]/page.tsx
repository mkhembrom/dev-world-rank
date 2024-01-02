"use client"
import Flags from '@/components/flags';
import { getCountry } from '@/lib/data';
import { useMount } from '@/lib/mount';
import { cn, convertToCommaSeperated } from '@/lib/utils'
import { useCountryStore } from '@/store/store';
import { CountryInfo, country } from '@/types/types';
import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'

export default function Page({params} : {params: {slug: string}}) {


  const data = useCountryStore((state) => state.countries);

  
  const countryDatas = data.filter((item: country) => item.name.common.toLowerCase() == params.slug.replace(/%20/g, ' ').toLowerCase());
  const countryData = Object.assign({}, countryDatas[0]);

//   const [countryData, setCountryData] = useState<CountryInfo | null>(null);
  
  
//   useEffect(() => {
//     async function getCountryDetails(slug: string) {
//       const countryInfo = await getCountry(slug);
//       setCountryData(countryInfo);  
//     }
//     getCountryDetails(params.slug);
    
//   },[params.slug])
//   console.log(countryData)
  

const lang = Object.values(Object.assign({}, countryData?.languages!)).join(", ");
const currency = Object.values(Object.assign({}, countryData?.currencies!)).map((curr: any) => `${curr.symbol} (${curr.name})`).join(', ');
const continents = Object.values(Object.assign({}, countryData?.continents!)).join(", ");
const mount = useMount();
  if(!mount) return null;
  return (

    <div className={cn("w-full flex flex-col item-center justify-center text-ptext  overflow-x-hidden")}>
        <div className="w-screen h-[300px] relative ">
          <Image className="object-cover z-10 absolute top-1/2 left-1/2 -translate-x-1/2" src={"/assets/Logo.svg"} alt="logo" width={200} height={100}  />
          <Image className="object-cover" src={"/assets/hero-image-wr.jpg"} alt="world" layout="fill"  />
        </div>
        <div className='w-full px-4 mx-0 flex items-center justify-center'>
          <div className="relative rounded-2xl z-10 border border-sbg bg-pbg w-full sm:max-w-[720px] -mt-10 sm:mx-auto h-full mb-10 ">
          <div className='w-[200px] h-[120px] sm:w-[300px] sm:h-[200px] mx-auto absolute -top-10 left-0 right-0'>
            <Image src={countryData?.flags?.png} alt={params.slug} width={320} height={200} className="rounded-xl h-full w-full mx-auto object-cover"  />
          

          </div>
          <div className='mt-[120px] sm:mt-[180px]'>
            
          <h1 className='text-center text-3xl font-bold px-4'>{countryData?.name?.common}</h1>
          <h1 className='text-center text-md  font-semibold px-4'>{countryData?.name?.official}</h1>


          <div className=' flex items-center justify-evenly py-4 flex-col sm:flex-row space-y-2 sm:space-y-0 px-4 '>
        <div className='rounded-xl bg-sbg py-4 text-ptext divide-x flex items-center justify-evenly space-x-2 w-full sm:w-[280px] divide-ptext'><span className='px-4 font-[500] w-full' >Population</span> <span className='px-4 w-full font-semibold' >{convertToCommaSeperated(countryData?.population)}</span></div>
        <div className='rounded-xl bg-sbg py-4 text-ptext divide-x flex items-center justify-evenly space-x-2 w-full sm:w-[280px]  divide-ptext'><span className='px-4 font-[500] w-full' >Area(Km<sup>2</sup>)</span> <span className='px-4 w-full font-semibold' >{convertToCommaSeperated(countryData?.area)}</span></div>

          </div>

          <div className='w-full flex flex-col divide-y divide-sbg'>
                <div className='flex justify-between items-center w-full py-6 px-4'>
                  <h1 className='text-stext font-[600] '>Capital</h1>
                  <p className='text-ptext font-semibold'>{countryData?.capital}</p>
                </div>
                <div className='flex justify-between items-center w-full py-6 px-4'>
                  <h1 className='text-stext font-[600] '>Subregion</h1>
                  <p className='text-ptext font-semibold'>{countryData?.subregion}</p>
                </div>
                <div className='flex justify-between items-center w-full py-6 px-4'>
                  <h1 className='text-stext font-[600] '>Languages</h1>
                  <p className='text-ptext font-semibold flex space-x-1'>{lang}</p>
                </div>
                <div className='flex justify-between items-center w-full py-6 px-4'>
                  <h1 className='text-stext font-[600] '>Currencies</h1>
                  <p className='text-ptext font-semibold'>{currency}</p>
                </div>
                <div className='flex justify-between items-center w-full py-6 px-4'>
                  <h1 className='text-stext font-[600] '>Continent</h1>
                  <p className='text-ptext font-semibold'>{continents}</p>
                </div>
                <div className='flex flex-col justify-between items-start w-full py-6 px-4'>
                  <h1 className='text-stext font-[600] '>Neighbouring Countries</h1>
                  <div className='flex items-center gap-4 py-4 overflow-x-visible  w-full flex-wrap'>
                    
                    
                    <Suspense fallback={<>Loading...</>}>

                  <Flags code={countryData?.borders} />
                    </Suspense>
                  
                  </div>
                </div>
          </div>
          </div>
            {/* <pre>{JSON.stringify(countryDetail, null, 2)}</pre> */}
          </div>
        </div>
    </div>

    // <pre className='text-white'>{JSON.stringify(countryData, null, 2)}</pre>
  )
}
