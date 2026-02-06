import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for conditionally joining CSS class names with Tailwind CSS conflict resolution.
 * Combines 'clsx' for conditional logic and 'tailwind-merge' to handle overlapping Tailwind classes.
 * 
 * @param inputs - Array of class names, objects, or conditional values
 * @returns A sanitized, merged string of class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
