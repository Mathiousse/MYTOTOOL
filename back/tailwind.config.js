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
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                pink: "#f08080",
                pinkbg: "#ffc0cb",
                'custom-green': '#39b54a',
            },
            width: {
                '90': "90%",
            },
            boxShadow: {
                'based': "0px 3px 10px rgba(0, 0, 0, 0.2);",
            }
        },
    },

    plugins: [forms],
};