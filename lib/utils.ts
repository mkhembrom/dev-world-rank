import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import comma from "comma-number";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToCommaSeperated(num: number) {
  return comma(num);
}

