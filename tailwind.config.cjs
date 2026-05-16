/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    safelist: [
        "bg-palette2",
        "bg-palette3",
        "bg-palette4",
        "bg-palette5",
        "text-night",
        "text-palette2",
        "bg-cinnabarMain",
        "text-white",
    ],
    theme: {
        extend: {
            colors: {
                cinnabarMain: '#ED5E1',
                palette1: '#8EE4AF',
                palette2: '#EDF5E1',
                palette3: '#5CDB95',
                palette4: '#907163',
                palette5: '#379683',
                night: '#050608',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
