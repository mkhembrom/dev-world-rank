"use client"

import { useMount } from '@/lib/mount';
import { useCountryStore } from '@/store/store';
import { country } from '@/types/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react'

export default function Flags({code} : { code: string[] }) {

    const router = useRouter();

    const countriesData = useCountryStore((state) => state.countries);
    const filteredData = countriesData.filter((country: country) => {
      return country?.cca3 && code?.includes(country?.cca3);
    });

    const mount = useMount();
    if(!mount) return null;

  return (
    <Suspense fallback={<>loading...</>}>
        {
            filteredData.map((item: country, index: number) => (
                <div key={index} className='flex flex-col items-start cursor-pointer w-full' onClick={() => router.replace(`/${item.name.common}`)}>

                <div  className='w-[70px] h-[55px]'>
                    <Image className='rounded-lg object-contain w-full h-full' src={item.flags.png} alt={item.name.common} width={40} height={20}  />
                </div>
                <h1 className='text-sm font-semibold text-ptext py-2'>{item.name.common}</h1>
                </div>
            ))
        }
    </Suspense>
  )
}
