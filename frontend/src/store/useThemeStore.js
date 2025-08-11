import React from 'react'
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("learnify-theme") || "forest", // Default theme
    setTheme: (theme) => {
        localStorage.setItem("learnify-theme", theme);
        set({ theme });
    },
}));