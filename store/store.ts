import { create } from 'zustand'
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware'

import { country } from "../types/types"

interface CountryState {
  countries: Array<country>;
  search: string;
  region: string[];
  sortValue: string;
  isFree: boolean;
  unMember: boolean;
  setFree: (data: boolean) => void;
  setUnMember: (data: boolean) => void;
  sortBy: (sortBy: string) => void;
  setCountries: (data: Array<country>) => void;
  setSearch: (data: string) => void;
  setRegion: (data: string[]) => void;
}

export const useCountryStore = create<CountryState>()(
  
  persist(
    (set, get) => ({
      countries: [],
      search: "",
      sortValue: 'area',
      region: [],
      isFree: false,
      unMember: false,
      setFree: (data: boolean) => set(() => ({ isFree: data })),
      setUnMember: (data: boolean) => set(() => ({ unMember: data })),
      sortBy: (sortBy: string) => set((state) => ({ sortValue: sortBy })),
      setCountries: (data: Array<country>) => set((state) => ({ countries: data})),
      setSearch: (data: string) => set((state) => ({ search: data})),
      setRegion: (data: string[]) => set((state) => ({ region: data})),
    }),
    {
      name: 'country-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),

)