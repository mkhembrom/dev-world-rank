"use client"
import React, {ComponentPropsWithRef } from 'react'
import {Input} from "@/components/ui/input"
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCountryStore } from '@/store/store';
import { useMount } from '@/lib/mount';

type Props = ComponentPropsWithRef<"input">;

export default function SearchInput(props: Props) {

  const search = useCountryStore((state) => state.search);
  const setSearch = useCountryStore((state) => state.setSearch);

  const mount = useMount();
  if(!mount) return null;
  return (
    <div className='relative w-96 flex items-center justify-between'>
        <Image className='absolute left-2 z-10 h-full' src={"/assets/Search.svg"} alt="searchicon" width={24} height={24} />
        <Input 
          className={cn("bg-sbg text-ptext font-semibold border-none rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 py-4 pl-10")} 
          type="text" 
          placeholder='Search by name, Region, Subregion'
          value={search}  
          onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}
