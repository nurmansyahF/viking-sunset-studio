const BASE_VIEWPORT_WIDTH = 1440;
module.exports = {
    content: ["./src/**/*.{html,njk}", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          intrumentsans: ["Instrument Sans Condensed", "sans-serif"],
          intrumentserif: ["Instrument Serif ", "sans-serif"],
          geist: ["Geist Mono", "sans-serif"],
          anton: ["Anton", "sans-serif"],
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
  