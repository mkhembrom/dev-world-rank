"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCountryStore } from "@/store/store"
import { useMount } from "@/lib/mount"

const frameworks = [
  {
    value: "population",
    label: "Population",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "area",
    label: "Area",
  },
  
]

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const sortBy = useCountryStore((state) => state.sortBy);
  
  React.useEffect(() => {
    sortBy(value);
  },[value])

  const mount = useMount();
  if(!mount) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={cn("w-full")}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent border-2 font-semibold border-sbg hover:bg-transparent text-ptext hover:text-ptext rounded-2xl"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Population"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0 bg-sbg text-ptext border-2 border-sbg rounded-2xl ")}>
        <Command className={cn("bg-transparent text-ptext ")}>
          {/* <CommandInput className="bg-transparent text-ptext placeholder:font-semibold placeholder:text-stext" placeholder="Search framework..." /> */}
          {/* <CommandEmpty className="text-sm text-ptext p-4">No framework found.</CommandEmpty> */}
          <CommandGroup className={cn("bg-transparent")}>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }} 
                className={cn("text-stext hover:text-ptext bg-sbg hover:bg-sbg font-semibold w-full" )}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
