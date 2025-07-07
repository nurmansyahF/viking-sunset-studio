const BASE_VIEWPORT_WIDTH = 1440;
module.exports = {
    content: ["./src/**/*.{html,njk}", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          geist: ["Geist", "sans-serif"],
        },
        colors: {
            primary: "#E64351",
            secondary: "#211C1C"
        },
        fontSize: {
            '80': '5rem'
        },
        textIndent: {
          '0': '0',
          'sm': '1em',
          'md': '2em',
          'lg': '3em',
          'neg-md': '-2em', // contoh indentasi negatif
        }
      },
    },
    plugins: [
      function({ addUtilities, theme, matchUtilities  }) {
        const indent = theme('textIndent');
        const utilities = Object.entries(indent).map(([key, value]) => ({
          [`.indent-${key}`]: { 'text-indent': value },
        }));
        addUtilities(utilities);        
      }
    ],
  };
  