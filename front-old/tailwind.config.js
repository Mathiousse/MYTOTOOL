const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.js'],
    darkMode: 'media',
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
    variants: {
        extend: {
            opacity: ['disabled'],

        },
        animation: ['responsive', 'motion-safe', 'motion-reduce'],
    },
    plugins: [require('@tailwindcss/forms')],
}
