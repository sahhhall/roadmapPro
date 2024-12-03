import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    isDarkMode: boolean;
}

// for checking initial sate
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        //  dark class to body if dark mode was prev selected
        document.body.classList.add('dark');
        return true;
    }
    document.body.classList.remove('dark');
    return false;
};

const initialState: ThemeState = {
    isDarkMode: getInitialTheme()
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            if (state.isDarkMode) {
                localStorage.setItem('theme', 'dark');
                document.body.classList.add('dark');
            } else {
                localStorage.removeItem('theme');
                document.body.classList.remove('dark');
            }
        },

    }
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;