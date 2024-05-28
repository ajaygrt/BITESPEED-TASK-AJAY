/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  theme: {
    extend: {
      colors: {
        defaultFont:'#192e5b',
        siteDarkBlue: '#192e5b',
        siteBlue: '#035b96',
        defaultThemeLight:'#cde0ee',
        defaultBlack:'#191919',
        defaultThemeBlueLight:'#cde0ee',
        textGrey:'#707070'
      },
      screens: {
        xsm : {'max' : '376px'},
        pre_laptop : {'max' : '1366px'},
        tablet: "768px", // Artboard: 768px, Content width: 592px, 12 columns, Default gutter width (column gap) is 32px, Column width 20px, MX (Distance from left and right edges) is 88px, Viewport height: 1024px, Breakpoints: min width 768px, max width 1365px
        tablet_only: {'min' : '376px' , 'max' : '1366px'},
        laptop: "1366px", // Artboard 1366px, Content width: 1086px, 12 columns, Default gutter width (column gap) is 30px, Column width: 63px MX (Distance from left and right edges) is 140px, Viewport height: 768px, Breakpoints: min width: 1366, Max width 1645px
        laptop_only: {'min' : '1366px' , 'max' : '1645px'},
        desktop: {'min' : '1645px' , 'max' :'2560px'}, // Artboard 1920px, Content width: 1366px, 12 columns, Default gutter width (column gap) is 25px, Column width: 91px, MX (Distance from left and right edges) is 276px, Viewport height: 1080px, Breakpoints: min width: 1646, Max width 1920px
        widescreen: "2560px", // Artboard 2560px, Content width: 2000px, 12 columns, Default gutter width (column gap) is 40px, Column width: 130px, MX (Distance from left and right edges) is 276px, Viewport height: 1080px, Breakpoints: min width: 1646, Max width 1920px
      },
      fontSize: {
        '2.5xl': '26px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "320px",
          width: "100%",
          display: "flex",
          "@screen tablet": {
            maxWidth: "592px",
          },
          "@screen laptop": {
            maxWidth: "1086px",
          },
          "@screen desktop": {
            maxWidth: "1640px",
          },
        },
      })
    },
  ],
}
