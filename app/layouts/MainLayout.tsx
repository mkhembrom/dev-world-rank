"use client"
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={cn("w-full flex flex-col item-center justify-center")}>
      <div className="w-screen h-[300px] relative">
        <Image className="object-cover z-10 absolute top-1/2 left-1/2 -translate-x-1/2" src={"/assets/Logo.svg"} alt="logo" width={200} height={100}  />
        <Image className="object-cover" src={"/assets/hero-image-wr.jpg"} alt="world" layout="fill"  />
      </div>
      <div className="rounded-2xl z-10 border border-sbg bg-pbg p-4 lg:p-6  -mt-10  mx-4 lg:mx-10  mb-10">
          <div className='grid grid-cols-5 gap-4 bg-pbg p-0 m-0'>
              <div className='col-span-5 w-full bg-pbg'>
                  <Navbar />
              </div>
              <div className='col-span-5 lg:col-span-1 w-full'>
                  <Sidebar />
              </div>
              <div className='col-span-5 lg:col-span-4 w-full'>
                {children}
              </div>
          </div>
      </div>
    </div>
  )
}
