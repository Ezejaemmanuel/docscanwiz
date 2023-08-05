// "use client";
// import { useState, useEffect } from 'react'

// import { FiSun, FiMoon } from './DynamicPackages/OptimizeIcons';

// const ToggleModeButton: React.FC = () => {

//     const [darkMode, setDarkMode] = useState<boolean>(() => {
//         if (typeof window !== 'undefined') {
//             const isDark = localStorage.getItem('darkMode')
//             return JSON.parse(isDark!) as boolean
//         }
//         return false
//     })

//     useEffect(() => {
//         if (darkMode) {
//             document.documentElement.classList.add('dark')
//             localStorage.setItem('darkMode', JSON.stringify(true))
//         } else {
//             document.documentElement.classList.remove('dark')
//             localStorage.setItem('darkMode', JSON.stringify(false))
//         }
//     }, [darkMode])

//     return (
//         <button
//             className="bg-zinc-200 dark:bg-zinc-800 rounded-full p-2 transition-colors duration-150"
//             onClick={() => setDarkMode(!darkMode)}
//         >
//             {darkMode ? (
//                 <div className="text-zinc-900 dark:text-zinc-100">
//                     <FiMoon />
//                 </div>
//             ) : (
//                 <div className="text-zinc-900 dark:text-zinc-100">
//                     <FiSun />

//                 </div>
//             )}
//         </button>
//     )
// }

// export default ToggleModeButton

"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
