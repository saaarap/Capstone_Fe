/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],
  theme: {
    colors: {
      'sara' : {
        light: '#FCAEAE',
        default: '#FF6666',
        dark: '#09090b'
      },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
}