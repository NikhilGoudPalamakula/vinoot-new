module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Open Sans',
      secondary: 'Lato',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1170px',
    },
    extend: {
      colors: {
        primary: '#212353',
        secondary: '#4B5D68',
        customColor: '#2A8201',
        accent: {
          primary: '#9C69E2',
          primary_hover: '#9059DB',
          secondary: '#F063B8',
          secondary_hover: '#E350A9',
          tertiary: '#68C9BA',
        },
      },
      backgroundImage: {
        hero: "url('../src/assets/img/hero_bg.png')",
      },
      dropShadow: {
        primary: ' 0px 5px 5px rgba(75, 93, 104, 0.1)',
      },
    },
    
  },
  plugins: [],
};


// ---------------
// export default {
//   // content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {
//         primary: "#f42c37",
//         secondary: "#f42c37",
//         brandYellow: "#fdc62e",
//         brandGreen: "#2dcc6f",
//         brandBlue: "#1376f4",
//         brandWhite: "#eeeeee",
//       },
//       container: {
//         center: true,
//         padding: {
//           DEFAULT: "1rem",
//           sm: "3rem",
//         },
//       },
//     },
//   },
//   plugins: [],
// };