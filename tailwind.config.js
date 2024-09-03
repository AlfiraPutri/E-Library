import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {

            colors: {
                primary: "#E85C0D",
                secondary: "#f21b74",
                navbarBackground: "#F8F0E5",
                heroBackground: "#F4E8D5",
              },
              boxShadow: {
                "custom-inset": '3px 3px 4px rgba(0, 0, 0, 0.25), inset 2px 5px 6px rgba(255, 255, 255, 0.37), inset 0px -5px 6px rgba(0, 0, 0, 0.37)',
              },
              container: {
                  center: true,
                padding: {
                  DEFAULT: "1rem",
                  sm: "2rem",
                  lg: "4rem",
                  xl: "5rem",
                  "2xl": "6rem",
                },
              },

            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
