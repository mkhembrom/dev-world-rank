import Flags from '@/components/flags';
import { codeCountry, getCountry } from '@/lib/data';
import { cn, convertToCommaSeperated } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default async function Page({params} : {params: {slug: string}}) {

  const countryDetail = await getCountry(params.slug as string);

 



  return (
    <div className={cn("w-full flex flex-col item-center justify-center text-ptext  overflow-x-hidden")}>
      <div className="w-screen h-[300px] relative ">
        <Image className="object-cover z-10 absolute top-1/2 left-1/2 -translate-x-1/2" src={"/assets/Logo.svg"} alt="logo" width={200} height={100}  />
        <Image className="object-cover" src={"/assets/hero-image-wr.jpg"} alt="world" layout="fill"  />
      </div>
      <div className='w-full px-4 mx-0 flex items-center justify-center'>
      <div className="relative rounded-2xl z-10 border border-sbg bg-pbg w-full sm:max-w-[720px] -mt-10 sm:mx-auto h-full mb-10 ">
         <div className='w-[200px] sm:w-96 h-48 mx-auto absolute -top-10 left-0 right-0'>
          <Image className='rounded-xl mx-auto object-cover' src={countryDetail.image} alt={params.slug} width={320} height={200} aria-label={countryDetail.name} />
         

         </div>
         <div className='mt-[120px] sm:mt-[180px]'>
          
         <h1 className='text-center text-3xl font-bold px-4'>{countryDetail.name}</h1>
         <h1 className='text-center text-md  font-semibold px-4'>{countryDetail.officialName}</h1>


         <div className=' flex items-center justify-evenly py-4 flex-col sm:flex-row space-y-2 sm:space-y-0 px-4 '>
      <div className='rounded-xl bg-sbg py-4 text-ptext divide-x flex items-center justify-evenly space-x-2 w-full sm:w-[280px] divide-ptext'><span className='px-4 font-[500] w-full' >Population</span> <span className='px-4 w-full font-semibold' >{convertToCommaSeperated(countryDetail.population)}</span></div>
      <div className='rounded-xl bg-sbg py-4 text-ptext divide-x flex items-center justify-evenly space-x-2 w-full sm:w-[280px]  divide-ptext'><span className='px-4 font-[500] w-full' >Area(Km<sup>2</sup>)</span> <span className='px-4 w-full font-semibold' >{convertToCommaSeperated(countryDetail.area)}</span></div>

         </div>

         <div className='w-full flex flex-col divide-y divide-sbg'>
              <div className='flex justify-between items-center w-full py-6 px-4'>
                <h1 className='text-stext font-[600] '>Capital</h1>
                <p className='text-ptext font-semibold'>{countryDetail.capital}</p>
              </div>
              <div className='flex justify-between items-center w-full py-6 px-4'>
                <h1 className='text-stext font-[600] '>Subregion</h1>
                <p className='text-ptext font-semibold'>{countryDetail.subregion}</p>
              </div>
              <div className='flex justify-between items-center w-full py-6 px-4'>
                <h1 className='text-stext font-[600] '>Languages</h1>
                <p className='text-ptext font-semibold flex space-x-1'>{countryDetail.language.map((item: any, index) => { return <p key={index}>{item},</p>})}</p>
              </div>
              <div className='flex justify-between items-center w-full py-6 px-4'>
                <h1 className='text-stext font-[600] '>Currencies</h1>
                <p className='text-ptext font-semibold'>{countryDetail.currencies}</p>
              </div>
              <div className='flex justify-between items-center w-full py-6 px-4'>
                <h1 className='text-stext font-[600] '>Continent</h1>
                <p className='text-ptext font-semibold'>{countryDetail.continent}</p>
              </div>
              <div className='flex flex-col justify-between items-start w-full py-6 px-4'>
                <h1 className='text-stext font-[600] '>Neighbouring Countries</h1>
                <div className='flex items-center space-x-4 py-4 overflow-x-visible'>
                  
                <Flags code={countryDetail.borders} />
                
                </div>
              </div>
         </div>
         </div>
          {/* <pre>{JSON.stringify(countryDetail, null, 2)}</pre> */}
      </div>
      </div>
      </div>
  )
}
