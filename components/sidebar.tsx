"use client"
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Combobox } from './combobox'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Checkbox } from '@/components/ui/checkbox'
import { useCountryStore } from '@/store/store'
import {useMount} from "@/lib/mount"
export default function Sidebar() {

  const setRegion = useCountryStore((state) => state.setRegion);
  const setFree = useCountryStore((state) => state.setFree);
  const setUnMember = useCountryStore((state) => state.setUnMember);
  const isFree = useCountryStore((state) => state.isFree) as boolean;
  const unMember = useCountryStore((state) => state.unMember) as boolean;
  const region = useCountryStore((state) => state.region);


  const [c, setC] = useState(() => region);
  useEffect(() => {
    setRegion(c)
   
  }, [c])


  const continent = [
    {
      name: "Americas",
    },
    {
      name: "Antartica",
    },
    {
      name: "Africa",
    },
    {
      name: "Asia",
    },
    {
      name: "Europe",
    },
    {
      name: "Oceania",
    },
  ]

  const mount = useMount();
  if(!mount) return null;

  return (
    <div className='flex flex-col w-full text-stext space-y-6 justify-between'>
        <div className='flex flex-col space-y-2 w-full'>
            <Label className='text-sm font-semibold'>Sort by</Label>
            <Combobox />
        </div>
        <div className='flex flex-col space-y-2 w-full'>
            <Label className='text-sm font-semibold'>Region</Label>
           
              <ToggleGroup onValueChange={setC} type="multiple" className={cn("w-full xl:w-[300px] flex flex-wrap gap-x-2 gap-y-2 items-center justify-start")}>
                {
                  continent.map((con) => {
                    return <ToggleGroupItem key={con.name} variant={"default"} size={"sm"} className={cn("rounded-2xl font-semibold text-ptext hover:text-stext bg-sbg ")} value={con.name}>{con.name}</ToggleGroupItem>

                  })
                }
      
              </ToggleGroup>

        </div>
        <div className='flex flex-col space-y-4 justify-between pb-4 mb-0 '>
        <Label className='text-sm font-semibold'>Status</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" className='border-2 w-7 h-7 border-sbg checked:border-primary rounded-lg'   checked={unMember}  onCheckedChange={() => setUnMember(!unMember)} />
            <Label
              htmlFor="terms1"
              className="text-ptext text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Member of the United Nation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox  id="terms2" className='border-2 w-7 h-7 border-sbg checked:border-primary rounded-lg'  checked={isFree}  onCheckedChange={() => setFree(!isFree)}  />
            <Label
              htmlFor="terms2"
              className="text-ptext text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Independent
            </Label>
          </div>
        </div>
    </div>
  )
}
