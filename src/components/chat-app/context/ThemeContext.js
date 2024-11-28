import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark'
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }

    const values = {
        theme,
        toggleTheme,
        isLightTheme: theme === 'light',
        isDarkTheme: theme === 'dark'
    }

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}