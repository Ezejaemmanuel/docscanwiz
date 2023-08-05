"use client";
import { useState, useEffect } from 'react'

import { FiSun, FiMoon } from './DynamicPackages/OptimizeIcons';

const ToggleModeButton: React.FC = () => {

    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const isDark = localStorage.getItem('darkMode')
            return JSON.parse(isDark!) as boolean
        }
        return false
    })

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('darkMode', JSON.stringify(true))
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('darkMode', JSON.stringify(false))
        }
    }, [darkMode])

    return (
        <button
            className="bg-zinc-200 dark:bg-zinc-800 rounded-full p-2 transition-colors duration-150"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? (
                <div className="text-zinc-900 dark:text-zinc-100">
                    <FiMoon />
                </div>
            ) : (
                <div className="text-zinc-900 dark:text-zinc-100">
                    <FiSun />

                </div>
            )}
        </button>
    )
}

export default ToggleModeButton